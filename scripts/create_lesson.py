import os
import re
import argparse

def create_html_template(lesson_id, lesson_title, category_label):
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{lesson_title} | StatIQ Academy</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <div class="container">
    <a href="../index.html" class="back-btn">← Back to StatIQ Academy</a>
    <span class="badge">{category_label}</span>
    <h1>{lesson_title}</h1>
    <p>A reference guide and training material on {lesson_title}.</p>

    <div class="card">
      <h3>💡 Core Objective</h3>
      <p>Enter the core concepts and learnings for {lesson_title} here.</p>
    </div>

    <h2>1. Introduction</h2>
    <p>Write your detailed notes, code blocks, and guide contents in these sections.</p>
    <pre><code>-- Example code snippet
SELECT * FROM my_data_table;</code></pre>
  </div>
</body>
</html>
"""
    file_path = os.path.join("content", f"{lesson_id}.html")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[OK] Created HTML template: {file_path}")

def update_reader_js(lesson_id, lesson_title, module_id, read_time):
    file_path = "reader.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Locate the target module section
    module_pattern = rf'(moduleId:\s*"{module_id}",\s*lessons:\s*\[)'
    match = re.search(module_pattern, content)
    
    if not match:
        print(f"[ERROR] Could not find moduleId '{module_id}' in reader.js")
        return False

    # Define the new lesson JS block
    lesson_js = f"""\n        {{
          title: "{lesson_title}",
          id: "{lesson_id}",
          file: "content/{lesson_id}.html",
          type: "notes",
          readTime: {read_time},
          quiz: [
            {{
              q: "Example Question 1 for {lesson_title}?",
              options: [
                "Correct Answer Choice",
                "Incorrect Option A",
                "Incorrect Option B",
                "Incorrect Option C"
              ],
              answer: 0,
              explain: "Explain why this answer is correct here."
            }},
            {{
              q: "Example Question 2 for {lesson_title}?",
              options: [
                "Incorrect Option A",
                "Correct Answer Choice",
                "Incorrect Option B",
                "Incorrect Option C"
              ],
              answer: 1,
              explain: "Explain why this answer is correct here."
            }},
            {{
              q: "Example Question 3 for {lesson_title}?",
              options: [
                "Incorrect Option A",
                "Incorrect Option B",
                "Correct Answer Choice",
                "Incorrect Option C"
              ],
              answer: 2,
              explain: "Explain why this answer is correct here."
            }}
          ]
        }},"""

    # Insert it right at the start of the lessons list
    pos = match.end()
    new_content = content[:pos] + lesson_js + content[pos:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"[OK] Registered lesson '{lesson_id}' in reader.js")
    return True

def update_app_js(lesson_id, lesson_title, description, tags_list):
    file_path = "app.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    catalog_pattern = r'(const\s+resourcesData\s*=\s*\[)'
    match = re.search(catalog_pattern, content)
    
    if not match:
        print("[ERROR] Could not locate resourcesData array in app.js")
        return False

    tags_js = ", ".join([f'"{t.strip()}"' for t in tags_list])
    resource_js = f"""\n    {{
      title: "{lesson_title}",
      category: "guide",
      description: "{description}",
      tags: [{tags_js}],
      downloadText: "Read Study Guide",
      link: "reader.html?topic={lesson_id}"
    }},"""

    pos = match.end()
    new_content = content[:pos] + resource_js + content[pos:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"[OK] Registered search catalog item in app.js")
    return True

def update_index_html(lesson_id, lesson_title, module_num):
    file_path = "index.html"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update lesson count in the header
    # e.g., Module 06 • 7 Lessons • Project 06
    header_pattern = rf'(<!-- Accordion Module {module_num} -->.*?<p>Module {module_num} • )(\d+)( Lessons • Project {module_num}</p>)'
    match = re.search(header_pattern, content, re.DOTALL)
    
    if match:
        current_lessons = int(match.group(2))
        new_lessons = current_lessons + 1
        content = re.sub(
            header_pattern,
            rf'\g<1>{new_lessons}\g<3>',
            content,
            count=1,
            flags=re.DOTALL
        )
        print(f"[OK] Incremented Module {module_num} lesson count to {new_lessons} in index.html")
    else:
        print(f"[WARNING] Could not find accordion header for Module {module_num} in index.html")

    # 2. Add bullet check item to lessons list
    lessons_list_pattern = rf'(<!-- Accordion Module {module_num} -->.*?<div class="lessons-list">)'
    match_list = re.search(lessons_list_pattern, content, re.DOTALL)
    
    if match_list:
        bullet_js = f'\n                      <div class="lesson-item"><span class="lesson-item-bullet"></span> {lesson_title}: Auto-generated learning reference guide</div>'
        pos = match_list.end()
        content = content[:pos] + bullet_js + content[pos:]
        print(f"[OK] Added checklist item bullet for '{lesson_title}' in index.html")
    else:
        print(f"[WARNING] Could not locate lessons-list for Module {module_num} in index.html")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    return True

def main():
    parser = argparse.ArgumentParser(description="Automate the workflow of creating a new StatIQ lesson.")
    parser.add_argument("--id", required=True, help="Short lesson ID (e.g. pandas-wrangling)")
    parser.add_argument("--title", required=True, help="Full lesson title (e.g. Pandas Advanced Wrangling)")
    parser.add_argument("--module", required=True, help="Module ID (e.g. mod-4, mod-6)")
    parser.add_argument("--time", type=int, default=5, help="Estimated reading time in minutes")
    parser.add_argument("--desc", default="A comprehensive study notes reference guide.", help="Search database description")
    parser.add_argument("--tags", default="Data,Analysis", help="Comma-separated search tags")
    
    args = parser.parse_args()
    
    # Extract module number from module ID
    module_num_match = re.search(r'\d+', args.module)
    if not module_num_match:
        print(f"[ERROR] Invalid module format '{args.module}'. Must contain digits (e.g. mod-04 or mod-6).")
        return
        
    module_num = f"{int(module_num_match.group(0)):02d}"
    tags_list = args.tags.split(",")
    category_label = "Study Guide"
    if "mod-4" in args.module:
         category_label = "Data Wrangling Guide"
    elif "mod-6" in args.module:
         category_label = "Business Intelligence Guide"
         
    print(f"Creating lesson '{args.id}' under Module {module_num}...")
    
    create_html_template(args.id, args.title, category_label)
    if update_reader_js(args.id, args.title, args.module, args.time):
        update_app_js(args.id, args.title, args.desc, tags_list)
        update_index_html(args.id, args.title, module_num)
        
    print("\n[COMPLETE] New lesson has been created and registered automatically!")
    print("Next Steps: Run ./build.ps1 to verify and push your changes to GitHub.")

if __name__ == "__main__":
    main()
