document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // NAVIGATION BACKGROUND TRIGGER
  // ==========================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const isExpanded = navLinks.classList.contains('mobile-active');
    menuToggle.innerHTML = isExpanded ? '✕' : '☰';
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuToggle.innerHTML = '☰';
    });
  });

  // ==========================================
  // INTERACTIVE PATH EXPLORER
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const trackPanes = document.querySelectorAll('.track-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate current tabs
      tabButtons.forEach(t => t.classList.remove('active'));
      trackPanes.forEach(p => p.classList.remove('active'));

      // Activate clicked tab
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-track');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // ==========================================
  // DATA SANDBOX - INTERACTIVE REGRESSION
  // ==========================================
  // 10 Fixed Data Points in SVG Coordinate Space (400x300 viewport)
  // X: independent variable (study hours, experience, etc.)
  // Y: dependent variable (salary, test scores). 
  // Remember: SVG y-axis points DOWNWARDS, so lower Y value represents higher math output.
  const dataPoints = [
    { x: 60, y: 240 },
    { x: 90, y: 220 },
    { x: 120, y: 190 },
    { x: 160, y: 180 },
    { x: 200, y: 140 },
    { x: 230, y: 130 },
    { x: 270, y: 90 },
    { x: 310, y: 80 },
    { x: 340, y: 50 },
    { x: 370, y: 40 }
  ];

  // Calculate actual mean of Y (for R-squared calculation)
  const yValues = dataPoints.map(p => p.y);
  const yMean = yValues.reduce((sum, val) => sum + val, 0) / yValues.length;
  // Total Sum of Squares (TSS) = Sum of (y_i - y_mean)^2
  const totalSumSquares = yValues.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0);

  const slopeSlider = document.getElementById('slope-slider');
  const interceptSlider = document.getElementById('intercept-slider');
  const slopeValText = document.getElementById('slope-val');
  const interceptValText = document.getElementById('intercept-val');
  const regressionLine = document.getElementById('regression-line');
  const r2Metric = document.getElementById('r2-metric');
  const mseMetric = document.getElementById('mse-metric');

  function updateRegression() {
    const slope = parseFloat(slopeSlider.value);
    const intercept = parseFloat(interceptSlider.value);

    // Update labels
    // In math: y = mx + c. But in SVG: y increases downwards.
    // So to draw an upward-trending line (going up as X increases), 
    // the SVG y value must decrease. We adjust the drawing logic accordingly.
    slopeValText.textContent = slope.toFixed(2);
    interceptValText.textContent = Math.round(intercept);

    // SVG coordinate range for line: X from 40 to 380
    const x1 = 40;
    const y1 = intercept - slope * (x1 - 50);
    const x2 = 380;
    const y2 = intercept - slope * (x2 - 50);

    // Update SVG Line endpoints
    regressionLine.setAttribute('x1', x1);
    regressionLine.setAttribute('y1', y1);
    regressionLine.setAttribute('x2', x2);
    regressionLine.setAttribute('y2', y2);

    // Calculate Residual Sum of Squares (RSS) and Mean Squared Error (MSE)
    let residualSumSquares = 0;
    dataPoints.forEach(p => {
      // Expected SVG Y coordinate based on current line parameters
      const yPred = intercept - slope * (p.x - 50);
      const residual = p.y - yPred;
      residualSumSquares += Math.pow(residual, 2);
    });

    const mse = residualSumSquares / dataPoints.length;
    // R^2 = 1 - (RSS / TSS)
    let r2 = 1 - (residualSumSquares / totalSumSquares);
    if (r2 < -1.0) r2 = -1.0; // clamp low negative values for UI aesthetics

    // Render Metrics
    r2Metric.textContent = r2.toFixed(3);
    mseMetric.textContent = Math.round(mse);

    // Add glowing color highlights for high performance fits
    if (r2 > 0.95) {
      r2Metric.style.color = '#10b981'; // Green
      r2Metric.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.4)';
    } else if (r2 > 0.8) {
      r2Metric.style.color = '#4facfe'; // Cyan/Blue
      r2Metric.style.textShadow = 'none';
    } else if (r2 < 0) {
      r2Metric.style.color = '#ef4444'; // Red
      r2Metric.style.textShadow = 'none';
    } else {
      r2Metric.style.color = '#f3f4f6'; // Gray-white
      r2Metric.style.textShadow = 'none';
    }
  }

  // Event Listeners for Sandbox Sliders
  if (slopeSlider && interceptSlider) {
    slopeSlider.addEventListener('input', updateRegression);
    interceptSlider.addEventListener('input', updateRegression);
    // Initial run
    updateRegression();
  }

  // ==========================================
  // STUDY PLANNER & TIMELINE CALCULATOR
  // ==========================================
  const targetRoleSelect = document.getElementById('target-role');
  const studyHoursSlider = document.getElementById('study-hours');
  const studyHoursVal = document.getElementById('study-hours-val');
  
  const totalStudyHoursText = document.getElementById('total-study-hours');
  const recommendedPaceText = document.getElementById('recommended-pace');
  const graduationTimeText = document.getElementById('graduation-time');
  const projectMilestonesText = document.getElementById('project-milestones');

  function calculateStudyPlan() {
    if (!targetRoleSelect || !studyHoursSlider) return;
    
    const track = targetRoleSelect.value;
    const studyHours = parseInt(studyHoursSlider.value);

    // Update study hours input label
    studyHoursVal.textContent = `${studyHours} hrs/wk`;

    // Total content hours and milestone counts based on track
    let totalHours = 300;
    let milestones = 4;
    
    switch (track) {
      case 'basics':
        totalHours = 60;
        milestones = 1;
        break;
      case 'statistics':
        totalHours = 100;
        milestones = 1;
        break;
      case 'data-analysis':
        totalHours = 180;
        milestones = 2;
        break;
      case 'data-science':
        totalHours = 300;
        milestones = 4;
        break;
      case 'business-intelligence':
        totalHours = 200;
        milestones = 4;
        break;
    }

    const weeksToGrad = Math.ceil(totalHours / studyHours);

    // Determine pacing label
    let pace = 'Moderate';
    if (studyHours < 10) {
      pace = 'Slow / Self-Paced';
    } else if (studyHours >= 10 && studyHours <= 20) {
      pace = 'Moderate / Regular';
    } else {
      pace = 'Intensive / Fast-Track';
    }

    // Render results dynamically
    animateValue(totalStudyHoursText, totalHours, val => `${val} Hrs`);
    recommendedPaceText.textContent = pace;
    graduationTimeText.textContent = `${weeksToGrad} Weeks`;
    animateValue(projectMilestonesText, milestones, val => `${val} Project${val > 1 ? 's' : ''}`);
  }

  // Simple numeric animation helper
  function animateValue(element, targetVal, formatter) {
    if (!element) return;
    const currentTextVal = element.textContent.replace(/[^0-9]/g, '');
    const startVal = isNaN(currentTextVal) || currentTextVal === '' ? 0 : parseInt(currentTextVal);
    const duration = 250; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.round(startVal + (targetVal - startVal) * progress);
      element.textContent = formatter ? formatter(currentVal) : currentVal;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // Event Listeners for Study Planner
  if (targetRoleSelect && studyHoursSlider) {
    targetRoleSelect.addEventListener('change', calculateStudyPlan);
    studyHoursSlider.addEventListener('input', calculateStudyPlan);
    // Initial run
    calculateStudyPlan();
  }

  // ==========================================
  // SYLLABUS & FAQ ACCORDIONS
  // ==========================================
  const setupAccordion = (headerClass, itemClass) => {
    const headers = document.querySelectorAll(headerClass);
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest(itemClass);
        const content = item.querySelector('.accordion-content, .faq-content');
        const isActive = item.classList.contains('active');

        // Close all siblings
        document.querySelectorAll(itemClass).forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingContent = sibling.querySelector('.accordion-content, .faq-content');
            if (siblingContent) siblingContent.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  };

  setupAccordion('.accordion-header', '.accordion-item');
  setupAccordion('.faq-header', '.faq-item');

  // Activate first syllabus accordion item by default
  const firstSyllabus = document.querySelector('.accordion-item');
  if (firstSyllabus) {
    firstSyllabus.classList.add('active');
    const content = firstSyllabus.querySelector('.accordion-content');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  // ==========================================
  // TESTIMONIALS SLIDER
  // ==========================================
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentSlideIndex = 0;

  if (track && slides.length > 0) {
    // Generate indicator dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
      });
    };

    const goToSlide = (index) => {
      currentSlideIndex = index;
      updateSlider();
    };

    prevBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex === 0) ? slides.length - 1 : currentSlideIndex - 1;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex === slides.length - 1) ? 0 : currentSlideIndex + 1;
      updateSlider();
    });

    // Auto play every 8 seconds
    let autoPlayInterval = setInterval(() => {
      currentSlideIndex = (currentSlideIndex === slides.length - 1) ? 0 : currentSlideIndex + 1;
      updateSlider();
    }, 8000);

    // Reset autoplay interval on user click
    const resetAutoplay = () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex === slides.length - 1) ? 0 : currentSlideIndex + 1;
        updateSlider();
      }, 8000);
    };

    prevBtn.addEventListener('click', resetAutoplay);
    nextBtn.addEventListener('click', resetAutoplay);
    dotsContainer.addEventListener('click', resetAutoplay);
  }



  // ==========================================
  // LEAD GENERATION MODAL
  // ==========================================
  const modalOverlay = document.getElementById('enroll-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalForm = document.getElementById('lead-form');
  const enrollButtons = document.querySelectorAll('.enroll-trigger');
  const toast = document.getElementById('success-toast');

  const openModal = (e) => {
    e.preventDefault();
    modalOverlay.classList.add('active');
    
    // Prefill role selection if triggered from a specific path
    const triggerSource = e.currentTarget.getAttribute('data-role-pref');
    if (triggerSource) {
      const formSelect = document.getElementById('form-interest');
      if (formSelect) formSelect.value = triggerSource;
    }

    document.getElementById('form-name').focus();
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalForm.reset();
  };

  enrollButtons.forEach(btn => btn.addEventListener('click', openModal));
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Form Submit Lead simulated handling
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Connecting to systems...';

      // Mock API delay (1.2s)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        closeModal();
        showToast();
      }, 1200);
    });
  }

  // Success Toast Display Trigger
  function showToast() {
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }

  // Newsletter Form Handler
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value.trim() !== '') {
        input.value = '';
        showToast();
      }
    });
  }

  // ==========================================
  // DYNAMIC RESOURCE LIBRARY SEARCH & FILTER
  // ==========================================
  const resourcesData = [
    {
      title: "Introduction to Statistical Learning (ISLP)",
      category: "textbook",
      description: "The definitive practical reference guide for machine learning algorithms implemented in Python, covering regression, classifications, and tree matrices.",
      tags: ["Python", "Math"],
      downloadText: "Download PDF (Free)",
      link: "https://www.statlearning.com/"
    },
    {
      title: "Python Programming Basics",
      category: "notes",
      description: "A fundamental overview of Python variables, primitive data types, conditionals, loops, lists, dictionaries, and reusable functions.",
      tags: ["Python", "Basics", "Syntax"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=python-basics-guide"
    },
    {
      title: "SQL Basics Foundations",
      category: "notes",
      description: "A fundamental guide on Structured Query Language SELECT statements, WHERE conditional filters, GROUP BY aggregations, and tables JOINs.",
      tags: ["SQL", "Basics", "Queries"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=sql-basics-guide"
    },
    {
      title: "CLI & Git Version Control",
      category: "notes",
      description: "Core shell commands for directory navigation and the standard Git workflow loop (Stage, Commit, Push) for version control.",
      tags: ["CLI", "Git", "Basics"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=cli-git-basics-guide"
    },
    {
      title: "Mathematics & Calculus Foundations",
      category: "notes",
      description: "A fundamental reference covering vectors, matrices, dot products, derivatives, Power Rule calculus, and Gradient Descent optimization.",
      tags: ["Math", "Basics", "Calculus"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=math-basics-guide"
    },
    {
      title: "Neural Networks Foundations",
      category: "guide",
      description: "An advanced reference guide on artificial neurons (perceptrons), non-linear activation functions (ReLU, Sigmoid, Softmax), MLPs, and backpropagation.",
      tags: ["ML", "Deep Learning", "Neural Networks"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=neural-networks-basics"
    },
    {
      title: "NLP & Transformer Attention",
      category: "guide",
      description: "An advanced guide on text tokenization, word embeddings (Word2Vec), TF-IDF, self-attention, and Encoder-Decoder architectures.",
      tags: ["ML", "NLP", "Transformers"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=nlp-transformers-basics"
    },
    {
      title: "Computer Vision & CNNs",
      category: "guide",
      description: "An advanced guide on representing image tensors, sliding kernel filters, convolutional layers, max pooling, and CNN classification architectures.",
      tags: ["ML", "Computer Vision", "CNN"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=computer-vision-basics"
    },
    {
      title: "MLOps Pipelines & Registries",
      category: "guide",
      description: "An advanced guide on dataset versioning, MLflow experiment tracking, model registries, and continuous integration/deployment (CI/CD) pipelines.",
      tags: ["MLOps", "MLflow", "Pipelines"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=mlops-basics-guide"
    },
    {
      title: "Probability & Statistics Foundations Notes",
      category: "notes",
      description: "Core probability theories, random variables, sample statistics, distributions, and hypothesis testing equations needed for data science.",
      tags: ["Math", "Statistics", "Theory"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=notes-probability-reference"
    },
    {
      title: "Data Analysis Foundations Notes",
      category: "notes",
      description: "A detailed reference for data classification systems, handling missing values, statistical outlier detection, and associations mapping.",
      tags: ["Data", "EDA", "Statistics"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=notes-data-analysis"
    },
    {
      title: "Feature Engineering & Data Preprocessing",
      category: "guide",
      description: "A reference guide on preparing numeric and categorical variables, scaling features, transforming distributions, and handling skewness.",
      tags: ["ML", "Preprocessing", "Python"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=feature-engineering-guide"
    },
    {
      title: "Prompt Engineering & LLM APIs",
      category: "guide",
      description: "A reference guide on zero-shot/few-shot prompting, system instructions, structured output parsing, and calling LLM APIs in Python.",
      tags: ["GenAI", "Gemini", "API"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=prompt-engineering-guide"
    },
    {
      title: "Data Pipelines & Orchestration (Airflow)",
      category: "guide",
      description: "A reference guide on declaring Directed Acyclic Graphs (DAGs), managing task dependencies, scheduling runs, and writing tasks using Airflow operators.",
      tags: ["Airflow", "ETL", "DAGs"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=airflow-pipelines-guide"
    },
    {
      title: "Model Evaluation Metrics Cheat Sheet",
      category: "guide",
      description: "A reference guide on classification metrics (precision, recall, F1, AUC), regression metrics (MSE, RMSE, R²), and confusion matrices.",
      tags: ["ML", "Metrics", "Validation"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=model-evaluation-guide"
    },
    {
      title: "SciPy Stats Module Foundations",
      category: "notes",
      description: "A reference guide on using Python's SciPy library to represent statistical distributions, run hypothesis tests, and compute confidence intervals.",
      tags: ["Python", "SciPy", "Statistics"],
      downloadText: "Open Study Notes",
      link: "reader.html?topic=notes-scipy-stats"
    },
    {
      title: "Jupyter Notebooks & Visual Explores",
      category: "guide",
      description: "A reference guide on running Jupyter Notebooks, mastering keyboard shortcuts, integrating inline charts, and compiling markdown cells.",
      tags: ["Jupyter", "Workspace", "IPython"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=jupyter-notebooks-guide"
    },
    {
      title: "TensorFlow & Deep Learning Architectures",
      category: "guide",
      description: "A reference guide on building multi-layer neural networks, compiling models with optimizers, and running gradient descent fitting processes.",
      tags: ["TensorFlow", "Keras", "Deep Learning"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=tensorflow-deep-learning"
    },
    {
      title: "PowerBI DAX & Semantic Modeling",
      category: "guide",
      description: "A reference guide on DAX functions, Calculated Columns vs. Measures, filter contexts, and Time Intelligence expressions.",
      tags: ["PowerBI", "DAX", "Modeling"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=powerbi-dax-guide"
    },
    {
      title: "Looker LookML Modeling Guide",
      category: "guide",
      description: "A reference guide on Looker's LookML data modeling language, defining views, explore joins, dimensions, and custom measures.",
      tags: ["Looker", "LookML", "Modeling"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=looker-lookml-guide"
    },
    {
      title: "Interactive Linear Regression Lecture Slides",
      category: "slides",
      description: "A step-by-step presentation deck explaining intercept, slope, Ordinary Least Squares fitting, and coefficient definitions.",
      tags: ["Regression", "Math", "Slides"],
      downloadText: "Start Slideshow",
      link: "reader.html?topic=slides-regression"
    },
    {
      title: "Data Analysis Lifecycle & Methods Slides",
      category: "slides",
      description: "An interactive presentation slide deck walking through the Ask, Prepare, Process, Analyze, Share, and Act workflow phases.",
      tags: ["EDA", "Workflow", "Slides"],
      downloadText: "Start Slideshow",
      link: "reader.html?topic=slides-data-analysis"
    },
    {
      title: "Retail Store Sales Practice Dataset",
      category: "dataset",
      description: "Clean sample CSV dataset containing customer segments, sales revenue, transaction quantities, discount, and profit metrics.",
      tags: ["CSV", "Retail", "Sales"],
      downloadText: "Download CSV",
      link: "content/store-sales-data.csv"
    },
    {
      title: "Modern SQL Optimization Cheatsheet",
      category: "cheatsheet",
      description: "High-speed analytical indexes, CTE structures, cohort partition layouts, and window aggregation formulas optimized for PostgreSQL and Snowflake.",
      tags: ["SQL", "Snowflake"],
      downloadText: "Get Cheatsheet",
      link: "reader.html?topic=sql-optimization"
    },
    {
      title: "Advanced Excel Formulas & Analytics Guide",
      category: "guide",
      description: "A structured walkthrough of lookups (XLOOKUP, INDEX/MATCH), conditional sums (SUMIFS), Pivot Tables, and Power Query ETL pipelines.",
      tags: ["Excel", "PowerQuery", "Formulas"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=excel-advanced-guide"
    },
    {
      title: "Tableau Dashboard Design & Calculations Guide",
      category: "guide",
      description: "A masterclass reference covering calculated fields, Level of Detail (LOD) calculations, Parameter Actions, and dashboard visual layouts.",
      tags: ["Tableau", "LOD", "Dashboards"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=tableau-dashboard-guide"
    },
    {
      title: "SaaS Customer Churn Practice Dataset",
      category: "dataset",
      description: "Clean sample CSV dataset containing subscriber records, active user counts, support ticket frequencies, and simulated churn probabilities.",
      tags: ["CSV", "ML", "Churn"],
      downloadText: "Download CSV",
      link: "content/customer-churn-data.csv"
    },
    {
      title: "SaaS Churn Analysis & Classifier Guide",
      category: "guide",
      description: "A step-by-step practical coding lesson using Python, Pandas, and Scikit-Learn to load the cohort dataset, analyze indicators, and train a predictive classifier.",
      tags: ["Python", "Pandas", "Scikit-Learn"],
      downloadText: "Read Study Guide",
      link: "reader.html?topic=customer-churn-guide"
    },
    {
      title: "NYC Taxi & Limousine Dataset (2025)",
      category: "dataset",
      description: "A cleaned, highly-optimized dataset containing 12 million trips in Parquet format, perfect for local regression modeling, geospatial analysis, and performance tests.",
      tags: ["Parquet", "DuckDB"],
      downloadText: "Download Dataset",
      link: "content/nyc-taxi-sample.csv"
    },
    {
      title: "LLM Retrieval-Augmented Generation (RAG)",
      category: "guide",
      description: "A developer walkthrough explaining vector index embeddings, local pgvector setups, and context-stuffed prompt workflows using LangChain.",
      tags: ["GenAI", "ChromaDB"],
      downloadText: "Read Blueprint",
      link: "reader.html?topic=rag-blueprint"
    },
    {
      title: "Polars vs. Pandas 2.0 DataFrame Reference",
      category: "cheatsheet",
      description: "Comprehensive syntax mappings, memory optimizations, lazy execution graphs, and thread execution differences for high-volume tabular workloads.",
      tags: ["Python", "Polars"],
      downloadText: "Get Guide",
      link: "reader.html?topic=polars-vs-pandas"
    },
    {
      title: "dbt Core Setup & Fact Star Modeling",
      category: "guide",
      description: "Architecting logical database transformations, model dependencies, schema assertions, and modular pipeline deployment in Snowflake warehouses.",
      tags: ["dbt", "Snowflake"],
      downloadText: "View Documentation",
      link: "reader.html?topic=dbt-star-schema"
    },
    {
      title: "Hands-On Machine Learning, 3rd Edition",
      category: "textbook",
      description: "Deep dive concepts into neural network architectures, hyperparameter grids, model evaluation curves, and production pipeline deployment.",
      tags: ["ML", "Keras"],
      downloadText: "Purchase Reference",
      link: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125837/"
    },
    {
      title: "Enterprise SaaS Economic Cohort Ledger",
      category: "dataset",
      description: "Synthesized ledger dataset containing subscriber profiles, CAC values, monthly billing, and cohort churn indexes for business intelligence drills.",
      tags: ["CSV", "BI Analytics"],
      downloadText: "Download Raw CSV",
      link: "content/saas-cohort-ledger.csv"
    }
  ];

  const resourcesGrid = document.getElementById('resources-grid');
  const searchInput = document.getElementById('resource-search');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderResources(filter = 'all', query = '') {
    if (!resourcesGrid) return;
    
    resourcesGrid.innerHTML = '';
    const filtered = resourcesData.filter(res => {
      const matchesCategory = filter === 'all' || res.category === filter;
      const matchesQuery = res.title.toLowerCase().includes(query.toLowerCase()) || 
                           res.description.toLowerCase().includes(query.toLowerCase()) ||
                           res.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      resourcesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-dark);">
          <p style="font-size: 1.1rem; font-weight: 500;">No matching resources found.</p>
          <p style="font-size: 0.85rem; margin-top: 4px;">Try searching for different terms or reset the filters.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(res => {
      const card = document.createElement('div');
      card.className = 'glass-card resource-card reveal';
      
      const header = document.createElement('div');
      header.className = 'resource-header';
      
      const badgeType = res.category === 'textbook' ? 'badge-purple' : 'badge-cyan';
      const categoryLabel = res.category.toUpperCase();
      
      header.innerHTML = `
        <span class="badge ${badgeType}" style="margin-bottom: 12px; font-size: 0.65rem;">${categoryLabel}</span>
        <h3>${res.title}</h3>
        <p>${res.description}</p>
      `;

      const footer = document.createElement('div');
      footer.className = 'resource-footer';
      
      let tagsHTML = '';
      res.tags.forEach(t => {
        tagsHTML += `<span class="resource-tag-badge">${t}</span>`;
      });

      footer.innerHTML = `
        <div class="resource-meta-tags">
          ${tagsHTML}
        </div>
        <a href="${res.link}" class="resource-download-btn">
          ${res.downloadText} →
        </a>
      `;

      card.appendChild(header);
      card.appendChild(footer);
      resourcesGrid.appendChild(card);
    });
  }

  // Bind filtering logic
  if (resourcesGrid) {

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        const queryVal = searchInput ? searchInput.value : '';
        renderResources(filterVal, queryVal);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        const filterVal = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        renderResources(filterVal, searchInput.value);
      });
    }

    // Initial render
    renderResources();
  }
});

