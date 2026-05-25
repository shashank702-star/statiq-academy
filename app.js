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
  // SALARY & ROI CALCULATOR
  // ==========================================
  const currentSalarySlider = document.getElementById('current-salary');
  const targetRoleSelect = document.getElementById('target-role');
  const studyHoursSlider = document.getElementById('study-hours');
  
  const currentSalaryVal = document.getElementById('current-salary-val');
  const studyHoursVal = document.getElementById('study-hours-val');
  
  const expectedSalaryText = document.getElementById('expected-salary');
  const salaryIncreaseText = document.getElementById('salary-increase');
  const graduationTimeText = document.getElementById('graduation-time');
  const paybackPeriodText = document.getElementById('payback-period');

  const TUITION_COST = 3600; // Flat program cost for ROI calculations

  function formatCurrency(num) {
    return '$' + num.toLocaleString('en-US');
  }

  function calculateROI() {
    const currentSalary = parseInt(currentSalarySlider.value);
    const targetRole = targetRoleSelect.value;
    const studyHours = parseInt(studyHoursSlider.value);

    // Dynamic output updates on labels
    currentSalaryVal.textContent = formatCurrency(currentSalary);
    studyHoursVal.textContent = `${studyHours} hrs`;

    // Baseline salary per career role
    let baseTargetSalary = 75000;
    switch (targetRole) {
      case 'data-analyst':
        baseTargetSalary = 78000;
        break;
      case 'business-analyst':
        baseTargetSalary = 84000;
        break;
      case 'bi-engineer':
        baseTargetSalary = 96000;
        break;
      case 'data-scientist':
        baseTargetSalary = 120000;
        break;
    }

    // Adjust expected salary based on study commitment (higher hours/wk suggests faster/more intensive learning)
    const hoursMultiplier = 1 + (studyHours - 5) * 0.005; 
    let expectedSalary = Math.round(baseTargetSalary * hoursMultiplier);

    // Make sure expected salary is at least $12,000 higher than current salary (career pivot boost)
    if (expectedSalary <= currentSalary) {
      expectedSalary = currentSalary + 15000;
    }

    const salaryIncrease = expectedSalary - currentSalary;
    
    // Program has 300 core curriculum hours
    const totalProgramHours = 300;
    const weeksToGrad = Math.ceil(totalProgramHours / studyHours);

    // Payback period (Months) = Tuition Cost / (Monthly Salary Increase)
    const monthlyIncrease = salaryIncrease / 12;
    const paybackMonths = TUITION_COST / monthlyIncrease;

    // Render results with slight animation or counting values
    animateValue(expectedSalaryText, expectedSalary, formatCurrency);
    animateValue(salaryIncreaseText, salaryIncrease, formatCurrency);
    graduationTimeText.textContent = `${weeksToGrad} Weeks`;
    
    if (paybackMonths < 1) {
      paybackPeriodText.textContent = 'Immediate';
    } else {
      paybackPeriodText.textContent = `${paybackMonths.toFixed(1)} Months`;
    }
  }

  // Simple numeric animation helper
  function animateValue(element, targetVal, formatter) {
    const currentTextVal = element.textContent.replace(/[$,]/g, '');
    const startVal = isNaN(currentTextVal) ? 0 : parseInt(currentTextVal);
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

  // Event Listeners for ROI Calculator
  if (currentSalarySlider && targetRoleSelect && studyHoursSlider) {
    currentSalarySlider.addEventListener('input', calculateROI);
    targetRoleSelect.addEventListener('change', calculateROI);
    studyHoursSlider.addEventListener('input', calculateROI);
    // Initial run
    calculateROI();
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
  // PRICING ANNUALLY / MONTHLY TOGGLE
  // ==========================================
  const pricingToggle = document.getElementById('billing-toggle');
  const pricingLabels = document.querySelectorAll('.pricing-label');
  const priceValues = document.querySelectorAll('.price-val');
  const pricePeriods = document.querySelectorAll('.price-period');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;
      
      pricingLabels[0].classList.toggle('active', !isAnnual);
      pricingLabels[1].classList.toggle('active', isAnnual);

      priceValues.forEach(priceEl => {
        const baseMonthlyVal = parseInt(priceEl.getAttribute('data-monthly'));
        const baseAnnualVal = parseInt(priceEl.getAttribute('data-annual'));
        
        if (isAnnual) {
          animateValue(priceEl, baseAnnualVal, val => val.toString());
        } else {
          animateValue(priceEl, baseMonthlyVal, val => val.toString());
        }
      });

      pricePeriods.forEach(periodEl => {
        periodEl.textContent = isAnnual ? '/yr' : '/mo';
      });
    });
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
      title: "Modern SQL Optimization Cheatsheet",
      category: "cheatsheet",
      description: "High-speed analytical indexes, CTE structures, cohort partition layouts, and window aggregation formulas optimized for PostgreSQL and Snowflake.",
      tags: ["SQL", "Snowflake"],
      downloadText: "Get Cheatsheet",
      link: "content/sql-optimization.html"
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
      link: "content/rag-blueprint.html"
    },
    {
      title: "Polars vs. Pandas 2.0 DataFrame Reference",
      category: "cheatsheet",
      description: "Comprehensive syntax mappings, memory optimizations, lazy execution graphs, and thread execution differences for high-volume tabular workloads.",
      tags: ["Python", "Polars"],
      downloadText: "Get Guide",
      link: "content/polars-vs-pandas.html"
    },
    {
      title: "dbt Core Setup & Fact Star Modeling",
      category: "guide",
      description: "Architecting logical database transformations, model dependencies, schema assertions, and modular pipeline deployment in Snowflake warehouses.",
      tags: ["dbt", "Snowflake"],
      downloadText: "View Documentation",
      link: "content/dbt-star-schema.html"
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

