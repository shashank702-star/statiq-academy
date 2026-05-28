#!/usr/bin/env Rscript

# StatIQ Academy - Unified R Automation Utility
# Allows developers and statistics students to verify links, audit content, 
# generate lesson templates, and deploy to GitHub using Base R scripting.

# ==========================================
# 🔍 1. VERIFICATION COMMANDS
# ==========================================

verify_links <- function() {
  cat("\n[1/4] Verifying Lesson Links...\n")
  if (!file.exists("reader.js")) {
    stop("reader.js not found in current directory. Please run from the project root.")
  }
  
  reader_js <- readChar("reader.js", file.info("reader.js")$size)
  matches <- regmatches(reader_js, gregexpr('file:\\s*"([^"]+)"', reader_js, perl = TRUE))[[1]]
  files <- unique(gsub('file:\\s*"|"', '', matches))
  
  all_ok <- TRUE
  for (f in files) {
    local_exists <- file.exists(f)
    
    # Check if file can be served from the local web server
    web_ok <- FALSE
    url <- paste0("http://localhost:8080/", f)
    tryCatch({
      con <- url(url)
      suppressWarnings(readLines(con, n = 1))
      close(con)
      web_ok <- TRUE
    }, error = function(e) {
      # connection failed or resource returned 404
    })
    
    if (local_exists && web_ok) {
      cat(paste0("  [OK] ", f, "\n"))
    } else {
      all_ok <- FALSE
      cat(paste0("  [FAIL] ", f, " (Local Exists: ", local_exists, ", Web Status: ", ifelse(web_ok, "200", "FAILED"), ")\n"))
    }
  }
  return(all_ok)
}

verify_homepage_links <- function() {
  cat("\n[2/4] Verifying Homepage Links...\n")
  if (!file.exists("index.html")) {
    stop("index.html not found in current directory.")
  }
  
  index_html <- readChar("index.html", file.info("index.html")$size)
  reader_js <- readChar("reader.js", file.info("reader.js")$size)
  
  matches <- regmatches(reader_js, gregexpr('id:\\s*"([^"]+)"', reader_js, perl = TRUE))[[1]]
  ids <- unique(gsub('id:\\s*"|"', '', matches))
  
  all_ok <- TRUE
  for (id in ids) {
    pattern <- paste0("reader.html\\?topic=", id)
    has_link <- grepl(pattern, index_html)
    if (has_link) {
      cat(paste0("  [OK] ", id, " is linked in index.html\n"))
    } else {
      all_ok <- FALSE
      cat(paste0("  [MISSING] ", id, " is NOT linked in index.html\n"))
    }
  }
  return(all_ok)
}

verify_app_links <- function() {
  cat("\n[3/4] Verifying Search Catalog Index...\n")
  if (!file.exists("app.js")) {
    stop("app.js not found in current directory.")
  }
  
  app_js <- readChar("app.js", file.info("app.js")$size)
  reader_js <- readChar("reader.js", file.info("reader.js")$size)
  
  matches <- regmatches(reader_js, gregexpr('id:\\s*"([^"]+)"', reader_js, perl = TRUE))[[1]]
  ids <- unique(gsub('id:\\s*"|"', '', matches))
  
  all_ok <- TRUE
  for (id in ids) {
    pattern <- paste0("topic=", id)
    has_index <- grepl(pattern, app_js)
    if (has_index) {
      cat(paste0("  [OK] ", id, " is registered in app.js\n"))
    } else {
      all_ok <- FALSE
      cat(paste0("  [MISSING] ", id, " is NOT registered in app.js\n"))
    }
  }
  return(all_ok)
}

verify_orphan_content <- function() {
  cat("\n[4/4] Auditing Orphan Content Files...\n")
  reader_js <- readChar("reader.js", file.info("reader.js")$size)
  matches <- regmatches(reader_js, gregexpr('file:\\s*"content/([^"]+)"', reader_js, perl = TRUE))[[1]]
  registered_files <- gsub('file:\\s*"content/|"', '', matches)
  
  all_files <- list.files("content", pattern = "\\.html$")
  
  all_ok <- TRUE
  for (f in all_files) {
    if (f %in% registered_files) {
      # registered successfully
    } else {
      all_ok <- FALSE
      cat(paste0("  [ORPHAN] content/", f, " exists but is NOT registered in reader.js\n"))
    }
  }
  if (all_ok) {
    cat("  No orphan files found.\n")
  }
  return(all_ok)
}

# ==========================================
# 🛠️ 2. LESSON CREATION UTILITY
# ==========================================

create_lesson <- function(id, title, module, read_time = 5, desc = "A comprehensive study notes reference guide.", tags = "Data,Analysis") {
  cat(paste0("Creating lesson '", id, "' under Module '", module, "'...\n"))
  
  # 1. Create HTML content template file
  category_label <- "Study Guide"
  if (grepl("4", module)) {
    category_label <- "Data Wrangling Guide"
  } else if (grepl("6", module)) {
    category_label <- "Business Intelligence Guide"
  }
  
  html_content <- paste0(
'<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>', title, ' | StatIQ Academy</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <div class="container">
    <a href="../index.html" class="back-btn">← Back to StatIQ Academy</a>
    <span class="badge">', category_label, '</span>
    <h1>', title, '</h1>
    <p>A reference guide and training material on ', title, '.</p>

    <div class="card">
      <h3>💡 Core Objective</h3>
      <p>Enter the core concepts and learnings for ', title, ' here.</p>
    </div>

    <h2>1. Introduction</h2>
    <p>Write your detailed notes, code blocks, and guide contents in these sections.</p>
    <pre><code># Example R code snippet
summary(cars)</code></pre>
  </div>
</body>
</html>'
  )
  
  dir.create("content", showWarnings = FALSE)
  html_path <- file.path("content", paste0(id, ".html"))
  writeLines(html_content, html_path)
  cat(paste0("  [OK] Created HTML template: ", html_path, "\n"))
  
  # 2. Register lesson in reader.js
  reader_content <- readChar("reader.js", file.info("reader.js")$size)
  pattern <- paste0('moduleId:\\s*"', module, '",\\s*lessons:\\s*\\[')
  match_pos <- regexpr(pattern, reader_content, perl = TRUE)
  if (match_pos == -1) {
    stop(paste0("Module ID '", module, "' not found in reader.js"))
  }
  match_len <- attr(match_pos, "match.length")
  insert_pos <- match_pos + match_len
  
  lesson_js <- paste0(
'\n        {
          title: "', title, '",
          id: "', id, '",
          file: "content/', id, '.html",
          type: "notes",
          readTime: ', read_time, ',
          quiz: [
            {
              q: "Example Question 1 for ', title, '?",
              options: [
                "Correct Answer Choice",
                "Incorrect Option A",
                "Incorrect Option B",
                "Incorrect Option C"
              ],
              answer: 0,
              explain: "Explain why this answer is correct here."
            },
            {
              q: "Example Question 2 for ', title, '?",
              options: [
                "Incorrect Option A",
                "Correct Answer Choice",
                "Incorrect Option B",
                "Incorrect Option C"
              ],
              answer: 1,
              explain: "Explain why this answer is correct here."
            },
            {
              q: "Example Question 3 for ', title, '?",
              options: [
                "Incorrect Option A",
                "Incorrect Option B",
                "Correct Answer Choice",
                "Incorrect Option C"
              ],
              answer: 2,
              explain: "Explain why this answer is correct here."
            }
          ]
        },'
  )
  
  new_reader <- paste0(
    substr(reader_content, 1, insert_pos - 1),
    lesson_js,
    substr(reader_content, insert_pos, nchar(reader_content))
  )
  writeLines(new_reader, "reader.js")
  cat("  [OK] Registered lesson in reader.js\n")
  
  # 3. Add to search catalog inside app.js
  app_content <- readChar("app.js", file.info("app.js")$size)
  catalog_pattern <- 'const\\s+resourcesData\\s*=\\s*\\['
  match_pos <- regexpr(catalog_pattern, app_content, perl = TRUE)
  match_len <- attr(match_pos, "match.length")
  insert_pos <- match_pos + match_len
  
  tags_list <- strsplit(tags, ",")[[1]]
  tags_js <- paste0('"', trimws(tags_list), '"', collapse = ", ")
  resource_js <- paste0(
'\n    {
      title: "', title, '",
      category: "guide",
      description: "', desc, '",
      tags: [', tags_js, '],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=', id, '"
    },'
  )
  
  new_app <- paste0(
    substr(app_content, 1, insert_pos - 1),
    resource_js,
    substr(app_content, insert_pos, nchar(app_content))
  )
  writeLines(new_app, "app.js")
  cat("  [OK] Registered search catalog item in app.js\n")
  
  # 4. Increment count and insert check bullet in index.html
  html_content <- readChar("index.html", file.info("index.html")$size)
  
  module_num_match <- regmatches(module, regexpr('\\d+', module))
  module_num <- sprintf("%02d", as.integer(module_num_match))
  
  header_pattern <- paste0('(<!-- Accordion Module ', module_num, ' -->.*?<p>Module ', module_num, ' • )(\\d+)( Lessons • Project ', module_num, '</p>)')
  match_pos <- regexpr(header_pattern, html_content, perl = TRUE)
  if (match_pos != -1) {
    match_val <- substr(html_content, match_pos, match_pos + attr(match_pos, "match.length") - 1)
    count_pos <- regexpr('\\d+(?= Lessons)', match_val, perl = TRUE)
    count <- as.integer(substr(match_val, count_pos, count_pos + attr(count_pos, "match.length") - 1))
    new_count <- count + 1
    
    new_match_val <- sub('\\d+(?= Lessons)', as.character(new_count), match_val, perl = TRUE)
    html_content <- paste0(
      substr(html_content, 1, match_pos - 1),
      new_match_val,
      substr(html_content, match_pos + attr(match_pos, "match.length"), nchar(html_content))
    )
    cat(paste0("  [OK] Incremented Module ", module_num, " lesson count to ", new_count, "\n"))
  }
  
  bullet_pattern <- paste0('(<!-- Accordion Module ', module_num, ' -->.*?<div class="lessons-list">)')
  match_pos <- regexpr(bullet_pattern, html_content, perl = TRUE)
  if (match_pos != -1) {
    insert_pos <- match_pos + attr(match_pos, "match.length")
    bullet_html <- paste0('\n                      <div class="lesson-item"><span class="lesson-item-bullet"></span> ', title, ': Auto-generated R learning reference guide</div>')
    html_content <- paste0(
      substr(html_content, 1, insert_pos - 1),
      bullet_html,
      substr(html_content, insert_pos, nchar(html_content))
    )
    cat(paste0("  [OK] Added checklist item bullet for '", title, "' in index.html\n"))
  }
  
  writeLines(html_content, "index.html")
  cat("\n[COMPLETE] New lesson has been created and registered automatically via Rscript!\n")
}

# ==========================================
# 🚀 3. CI/CD DEPLOY ORCHESTRATION
# ==========================================

run_deploy <- function(commit_msg) {
  cat("=========================================\n")
  cat(" Running StatIQ Academy Auto-Update (R)\n")
  cat("=========================================\n")
  
  # Run checks
  links_ok <- verify_links()
  home_ok <- verify_homepage_links()
  app_ok <- verify_app_links()
  orphan_ok <- verify_orphan_content()
  
  if (!(links_ok && home_ok && app_ok)) {
    stop("\n[ERROR] Verification failed! Deployment aborted.")
  }
  
  cat("\n[OK] All verification checks passed! Deploying changes...\n")
  
  # Invoke system commands for git
  system("git add .")
  commit_cmd <- paste0('git commit -m "', commit_msg, '"')
  system(commit_cmd)
  system("git push origin main")
  
  cat("\n=========================================\n")
  cat(" Successfully deployed to GitHub via R!\n")
  cat("=========================================\n")
}

# ==========================================
# 🏁 4. CLI ENTRYPOINT
# ==========================================

args <- commandArgs(trailingOnly = TRUE)

if (length(args) == 0) {
  cat("StatIQ Academy R-Automation Manager\n")
  cat("Usage:\n")
  cat("  Rscript scripts/statiq_manager.R verify\n")
  cat("  Rscript scripts/statiq_manager.R create --id <id> --title <title> --module <module> [--time <time>] [--desc <desc>] [--tags <tags>]\n")
  cat("  Rscript scripts/statiq_manager.R deploy [commit_message]\n")
  quit(status = 1)
}

cmd <- args[1]

if (cmd == "verify") {
  links_ok <- verify_links()
  home_ok <- verify_homepage_links()
  app_ok <- verify_app_links()
  orphan_ok <- verify_orphan_content()
  
  if (links_ok && home_ok && app_ok) {
    cat("\nAll checks passed successfully!\n")
    quit(status = 0)
  } else {
    cat("\nSome checks failed.\n")
    quit(status = 1)
  }
  
} else if (cmd == "create") {
  # Parse key-value arguments
  id <- NULL
  title <- NULL
  module <- NULL
  read_time <- 5
  desc <- "A comprehensive study notes reference guide."
  tags <- "Data,Analysis"
  
  for (i in 2:length(args)) {
    if (args[i] == "--id" && i < length(args)) id <- args[i+1]
    if (args[i] == "--title" && i < length(args)) title <- args[i+1]
    if (args[i] == "--module" && i < length(args)) module <- args[i+1]
    if (args[i] == "--time" && i < length(args)) read_time <- as.integer(args[i+1])
    if (args[i] == "--desc" && i < length(args)) desc <- args[i+1]
    if (args[i] == "--tags" && i < length(args)) tags <- args[i+1]
  }
  
  if (is.null(id) || is.null(title) || is.null(module)) {
    stop("Usage: Rscript scripts/statiq_manager.R create --id <id> --title <title> --module <module>")
  }
  
  create_lesson(id, title, module, read_time, desc, tags)
  
} else if (cmd == "deploy") {
  commit_msg <- "Auto-deploy update via Rscript"
  if (length(args) >= 2) {
    commit_msg <- args[2]
  }
  run_deploy(commit_msg)
  
} else {
  cat(paste0("Unknown command: '", cmd, "'\n"))
  quit(status = 1)
}
