import csv
import os
import sqlite3
from datetime import datetime

# Path Configurations
CSV_FILE = "transactions.csv"
DB_FILE = "retail_analytics.db"

def extract_raw_data(file_path):
    """Reads transactions from the CSV file."""
    print(f"[*] Extracting raw data from: {file_path}")
    raw_records = []
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Source dataset {file_path} not found.")
        
    with open(file_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            raw_records.append(row)
            
    print(f"[✓] Extracted {len(raw_records)} raw records.")
    return raw_records

def transform_data(raw_records):
    """Cleans, normalizes, and validates transaction records."""
    print("[*] Starting data transformations...")
    cleaned_records = []
    
    # Calculate average amount to impute missing ones
    amounts = []
    for r in raw_records:
        amt_str = r.get("amount", "").strip()
        if amt_str:
            try:
                amounts.append(float(amt_str))
            except ValueError:
                pass
    avg_amount = sum(amounts) / len(amounts) if amounts else 100.0
    print(f"    - Calculated default imputation amount: ${avg_amount:.2f}")

    for idx, row in enumerate(raw_records):
        tx_id = row.get("transaction_id", "").strip()
        cust_id = row.get("customer_id", "").strip()
        
        # 1. Skip completely invalid records
        if not tx_id or not cust_id:
            print(f"    [WARN] Skipping record index {idx}: missing critical identifiers.")
            continue
            
        # 2. Clean date formats (e.g. 2026/05/07 -> 2026-05-07)
        date_str = row.get("date", "").strip().replace("/", "-")
        if not date_str:
            date_str = datetime.today().strftime('%Y-%m-%d') # default to today
            
        # 3. Clean and impute missing amount
        amt_str = row.get("amount", "").strip()
        if not amt_str:
            amount = avg_amount
        else:
            try:
                amount = float(amt_str)
            except ValueError:
                amount = avg_amount
                
        # 4. Clean category name
        category = row.get("product_category", "").strip().capitalize()
        if not category:
            category = "Other"
            
        # 5. Clean state codes
        state = row.get("state", "").strip().upper()
        if not state:
            state = "US"

        cleaned_records.append({
            "transaction_id": tx_id,
            "customer_id": cust_id,
            "date": date_str,
            "product_category": category,
            "amount": round(amount, 2),
            "state": state
        })
        
    print(f"[✓] Transformed and validated {len(cleaned_records)} records.")
    return cleaned_records

def load_to_database(db_path, records):
    """Loads cleaned data to SQLite and generates summary aggregates."""
    print(f"[*] Loading cleaned data into SQLite database: {db_path}")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Create clean table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            transaction_id TEXT PRIMARY KEY,
            customer_id TEXT,
            date TEXT,
            product_category TEXT,
            amount REAL,
            state TEXT
        )
    """)
    
    # Clear old records to keep pipeline idempotent
    cursor.execute("DELETE FROM transactions")
    
    # 2. Insert records
    for r in records:
        cursor.execute("""
            INSERT OR REPLACE INTO transactions 
            (transaction_id, customer_id, date, product_category, amount, state)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            r["transaction_id"],
            r["customer_id"],
            r["date"],
            r["product_category"],
            r["amount"],
            r["state"]
        ))
    
    conn.commit()
    print("    - Cleaned transactions successfully loaded.")

    # 3. Aggregate summaries using SQL
    # Total sales and transaction count per product category
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS category_summary AS
        SELECT 
            product_category,
            COUNT(*) as transaction_count,
            ROUND(SUM(amount), 2) as total_sales,
            ROUND(AVG(amount), 2) as average_ticket
        FROM transactions
        GROUP BY product_category
    """)
    
    # Re-build summary table to reflect current data
    cursor.execute("DROP TABLE IF EXISTS category_summary")
    cursor.execute("""
        CREATE TABLE category_summary AS
        SELECT 
            product_category,
            COUNT(*) as transaction_count,
            ROUND(SUM(amount), 2) as total_sales,
            ROUND(AVG(amount), 2) as average_ticket
        FROM transactions
        GROUP BY product_category
    """)
    
    # Total sales per customer
    cursor.execute("DROP TABLE IF EXISTS customer_summary")
    cursor.execute("""
        CREATE TABLE customer_summary AS
        SELECT 
            customer_id,
            COUNT(*) as purchase_frequency,
            ROUND(SUM(amount), 2) as customer_lifetime_value
        FROM transactions
        GROUP BY customer_id
    """)
    
    conn.commit()
    conn.close()
    print("[✓] SQL summarizing completed. Connection closed.")

def generate_report(db_path):
    """Queries the database to print summaries to the console."""
    print("\n" + "="*50)
    print("           PIPELINE ANALYTICS REPORT")
    print("="*50)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Total Sales
    cursor.execute("SELECT SUM(amount), COUNT(*) FROM transactions")
    total_sales, count = cursor.fetchone()
    print(f"Total Sales Volume : ${total_sales:,.2f}")
    print(f"Total Transactions : {count}")
    print("-"*50)
    
    # Category Sales
    print(f"{'Category':<15} | {'Count':<8} | {'Total Sales':<12} | {'Average':<10}")
    print("-"*50)
    cursor.execute("SELECT * FROM category_summary ORDER BY total_sales DESC")
    for row in cursor.fetchall():
        print(f"{row[0]:<15} | {row[1]:<8} | ${row[2]:<11,.2f} | ${row[3]:<8,.2f}")
        
    print("-"*50)
    
    # Top Customers
    print("Top 3 Customers by Lifetime Value:")
    cursor.execute("SELECT * FROM customer_summary ORDER BY customer_lifetime_value DESC LIMIT 3")
    for idx, row in enumerate(cursor.fetchall()):
        print(f"  {idx+1}. Customer {row[0]:<5} - {row[1]} orders - Total: ${row[2]:,.2f}")
        
    print("="*50 + "\n")
    conn.close()

if __name__ == "__main__":
    try:
        raw_data = extract_raw_data(CSV_FILE)
        clean_data = transform_data(raw_data)
        load_to_database(DB_FILE, clean_data)
        generate_report(DB_FILE)
    except Exception as e:
        print(f"[CRITICAL ERROR] Pipeline failed: {e}")
