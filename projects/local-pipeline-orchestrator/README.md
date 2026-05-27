# Project 00: Local Data Pipeline Orchestrator

This project is a lightweight, pure-Python data engineering ETL (Extract, Transform, Load) pipeline that ingests raw transaction records, executes standard schema cleanings and null-value imputations, and aggregates analytical metrics into a local relational SQLite database.

## 🛠️ Architecture & Pipeline Flow

The orchestrator operates in four distinct phases:
1. **Extract**: Reads the raw CSV file (`transactions.csv`) using the built-in `csv` module.
2. **Transform**:
   - Parses date fields, replacing slash formatting (`/`) with SQL-standard dash delimiters (`-`).
   - Normalizes states to uppercase (e.g. `ca` -> `CA`).
   - Identifies null transaction amounts and imputes them with the computed average transaction amount of the dataset.
   - Skips corrupt records (e.g. missing critical indexes like `transaction_id`).
3. **Load**:
   - Establishes a local database connection (`retail_analytics.db`).
   - Truncates and populates the `transactions` table.
   - Runs background SQL aggregate functions to build summary tables: `category_summary` and `customer_summary`.
4. **Report**:
   - Queries summaries to print a console reporting dashboard showing overall statistics and top metrics.

## 📂 File Structure
*   `orchestrator.py`: Ingestion and ETL driver script.
*   `transactions.csv`: Raw mock transaction dataset.
*   `README.md`: Architectural overview and usage instructions.

## 🚀 Execution Instructions

Run the script from your terminal:
```bash
python orchestrator.py
```

Upon execution, the script will output log statements for each ETL phase and display the final report in the console, creating the local database file `retail_analytics.db` in the same folder.
