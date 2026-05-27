document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // SYLLABUS DATABASE
  // ==========================================
  const syllabus = [
    {
      moduleTitle: "Basics Foundations",
      moduleId: "mod-0",
      lessons: [
        {
          title: "Python Programming Basics",
          id: "python-basics-guide",
          file: "content/python-basics-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Which data type in Python stores key-value pairs representing records?",
              options: [
                "List",
                "Dictionary",
                "Tuple",
                "Set"
              ],
              answer: 1,
              explain: "Dictionaries in Python store mapping pairs defined as {key: value}, which are ideal for structured data records."
            },
            {
              q: "What does the code block range(5) yield in a Python for-loop?",
              options: [
                "Numbers 1 to 5 inclusive.",
                "Numbers 0 to 4 inclusive.",
                "A list containing five random float decimals.",
                "An array of string tokens."
              ],
              answer: 1,
              explain: "range(n) starts from 0 and stops at n-1, yielding numbers 0, 1, 2, 3, and 4."
            },
            {
              q: "How do you declare a parameter default value in a Python function definition?",
              options: [
                "By writing parameter := default inside the body.",
                "By assigning values directly in the def statement: def func(param=default).",
                "By using the global keyword inside functions.",
                "Python does not support parameter default values."
              ],
              answer: 1,
              explain: "Default values are assigned directly inside the def header parameter list using the '=' sign."
            }
          ]
        },
        {
          title: "SQL Basics Foundations",
          id: "sql-basics-guide",
          file: "content/sql-basics-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Which clause filters aggregate metric results in a grouped SQL query?",
              options: [
                "WHERE",
                "HAVING",
                "GROUP BY",
                "ORDER BY"
              ],
              answer: 1,
              explain: "WHERE filters raw rows before aggregation, while HAVING filters final grouped values after aggregation."
            },
            {
              q: "What is the difference between INNER JOIN and LEFT JOIN?",
              options: [
                "INNER returns matches only; LEFT returns matches plus unmatched rows from the left table.",
                "INNER returns all records; LEFT returns only matching records.",
                "INNER links database columns; LEFT joins tables vertically.",
                "There is no difference in syntax or results."
              ],
              answer: 0,
              explain: "INNER JOIN yields rows matching key IDs in both tables. LEFT JOIN retains all rows from the left table, padding right columns with NULL if unmatched."
            },
            {
              q: "Which statement computes the average value of a column in SQL?",
              options: [
                "MEAN(price)",
                "AVG(price)",
                "AVERAGE(price)",
                "SUM(price) / COUNT(*)"
              ],
              answer: 1,
              explain: "AVG() is the standard SQL aggregate function used to compute numeric column averages."
            }
          ]
        },
        {
          title: "CLI & Git Version Control",
          id: "cli-git-basics-guide",
          file: "content/cli-git-basics-guide.html",
          type: "notes",
          readTime: 4,
          quiz: [
            {
              q: "Which shell command navigate your terminal into a different subdirectory?",
              options: [
                "pwd",
                "ls",
                "cd",
                "mkdir"
              ],
              answer: 2,
              explain: "cd (Change Directory) navigates the terminal path, while pwd prints the current path."
            },
            {
              q: "What is the stage command in the Git commit loop?",
              options: [
                "git init",
                "git status",
                "git add",
                "git commit"
              ],
              answer: 2,
              explain: "git add stages changes, preparing tracked files to be committed in the next snapshot."
            },
            {
              q: "Why is Git called a distributed version control system?",
              options: [
                "Because code is distributed across many separate servers only.",
                "Every developer keeps a full copy of the repository history locally.",
                "Because it distributes code directly to deployment web servers.",
                "It requires network connections to track file histories."
              ],
              answer: 1,
              explain: "In Git, clones duplicate the entire project repository database, allowing offline tracking and local branches."
            }
          ]
        }
      ]
    },
    {
      moduleTitle: "Mathematical Foundations",
      moduleId: "mod-1",
      lessons: [
        {
          title: "Linear Algebra Foundations",
          id: "linear-algebra-basics",
          file: "content/linear-algebra-basics.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What is the dot product of vectors v = [2, 4] and w = [3, 1]?",
              options: [
                "10",
                "14",
                "6",
                "8"
              ],
              answer: 0,
              explain: "The dot product is (2*3) + (4*1) = 6 + 4 = 10."
            },
            {
              q: "Which matrix operation flips a matrix over its diagonal, swapping its rows and columns?",
              options: [
                "Inverse",
                "Determinant",
                "Transpose",
                "Eigendecomposition"
              ],
              answer: 2,
              explain: "The Transpose operation swaps rows with columns, turning an m x n matrix into an n x m matrix."
            },
            {
              q: "In Principal Component Analysis (PCA), what do eigenvectors of the covariance matrix represent?",
              options: [
                "The loss function gradients.",
                "The principal components representing axes of maximum variance.",
                "The scaling factor weights of hidden layers.",
                "The identity matrix diagonals."
              ],
              answer: 1,
              explain: "Eigenvectors of the covariance matrix point in the directions of maximum variance, defining the principal components."
            }
          ]
        },
        {
          title: "Calculus & Optimization Basics",
          id: "calculus-optimization-basics",
          file: "content/calculus-optimization-basics.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Using the Power Rule, what is the derivative of the function f(x) = 5x^3?",
              options: [
                "15x^2",
                "5x^2",
                "15x^3",
                "8x^2"
              ],
              answer: 0,
              explain: "d/dx(5x^3) = 5 * 3 * x^(3-1) = 15x^2."
            },
            {
              q: "Which mathematical rule is the primary mechanic of error backpropagation in deep neural networks?",
              options: [
                "The Product Rule",
                "The Chain Rule",
                "The Quotient Rule",
                "The Power Rule"
              ],
              answer: 1,
              explain: "The Chain Rule allows us to calculate the derivative of composite functions, passing error gradients back through nested layers."
            },
            {
              q: "How does Gradient Descent adjust a parameter weight w when the partial derivative of loss w.r.t w is positive?",
              options: [
                "It increases the weight w.",
                "It decreases the weight w.",
                "It leaves the weight w unchanged.",
                "It resets the weight w to zero."
              ],
              answer: 1,
              explain: "The gradient descent update rule is w = w - learning_rate * gradient. Since the gradient is positive, subtracting it decreases the weight."
            }
          ]
        },
        {
          title: "Discrete Mathematics & Logic Basics",
          id: "discrete-math-basics",
          file: "content/discrete-math-basics.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "In Set Theory, which set operation is equivalent to an INNER JOIN in SQL?",
              options: [
                "Union",
                "Difference",
                "Intersection",
                "Subset"
              ],
              answer: 2,
              explain: "Intersection (A ∩ B) returns elements that exist in both sets, which is identical to SQL's INNER JOIN condition."
            },
            {
              q: "If inputs A and B are True and False respectively, what are the outputs of AND and XOR operations?",
              options: [
                "AND: True, XOR: False",
                "AND: False, XOR: True",
                "AND: False, XOR: False",
                "AND: True, XOR: True"
              ],
              answer: 1,
              explain: "AND is True only if both are True (so False here). XOR is True if exactly one is True (so True here)."
            },
            {
              q: "Which expression represents the number of ways to choose a committee of r members from a pool of n candidates where order does not matter?",
              options: [
                "Permutations: P(n, r) = n! / (n - r)!",
                "Combinations: C(n, r) = n! / (r! * (n - r)!)",
                "Factorial: n!",
                "Summation: Σ(n)"
              ],
              answer: 1,
              explain: "Combinations are used when selection order does not matter, whereas Permutations are used when order does matter."
            }
          ]
        }
      ]
    },
    {
      moduleTitle: "Probability & Statistics Foundations",
      moduleId: "mod-2",
      lessons: [
        {
          title: "Probability Theory & Basics",
          id: "notes-probability-reference",
          file: "content/notes-probability-reference.html",
          type: "notes",
          readTime: 6,
          quiz: [
            {
              q: "What does Bayes' Theorem calculate?",
              options: [
                "The joint probability of two independent events.",
                "The posterior probability of an event based on prior knowledge of conditions.",
                "The dispersion of continuous variables around their mean.",
                "The absolute conversion rate splits of A/B landing pages."
              ],
              answer: 1,
              explain: "Bayes' Theorem models P(A|B) = P(B|A)*P(A)/P(B), which solves for the conditional probability of an event given prior evidence."
            },
            {
              q: "In an A/B test with baseline conversion 10%, which factor directly reduces the minimum required sample size?",
              options: [
                "Increasing the desired statistical power from 80% to 90%.",
                "Decreasing the significance alpha threshold from 0.05 to 0.01.",
                "Accepting a larger Minimum Detectable Effect (MDE).",
                "Increasing the variance of the underlying population."
              ],
              answer: 2,
              explain: "A larger MDE means you are looking for a bigger effect, which is easier to detect and requires fewer samples."
            },
            {
              q: "According to the Central Limit Theorem (CLT), what happens to the sampling distribution of the mean as sample size n increases?",
              options: [
                "It becomes highly skewed and matches the population shape.",
                "Its standard error increases proportionally.",
                "It approaches a normal distribution regardless of the population shape.",
                "It becomes identical to the cumulative density function."
              ],
              answer: 2,
              explain: "The CLT states that the distribution of sample means approaches normality as sample size increases, regardless of the shape of the population."
            }
          ]
        },
        {
          title: "Data Analysis Foundations & EDA",
          id: "notes-data-analysis",
          file: "content/notes-data-analysis.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Which data type describes user feedback scores (Poor, Fair, Good)?",
              options: [
                "Nominal Qualitative",
                "Ordinal Qualitative",
                "Discrete Quantitative",
                "Continuous Quantitative"
              ],
              answer: 1,
              explain: "Feedback scores have categorical values with a logical ordering, making them Ordinal Qualitative."
            },
            {
              q: "If a numerical column (e.g. Transaction Amounts) is highly right-skewed, which imputation strategy is best for missing values?",
              options: [
                "Mean Imputation",
                "Median Imputation",
                "Zero-fill Imputation",
                "Drop all rows"
              ],
              answer: 1,
              explain: "The median is robust against extreme outlier values, making it the preferred imputation for skewed distributions."
            },
            {
              q: "How does Tukey's IQR method define the upper outlier boundary?",
              options: [
                "Median + 1.5 * IQR",
                "Q3 + 1.5 * IQR",
                "Mean + 2 * Standard Deviation",
                "Q3 + 3.0 * IQR"
              ],
              answer: 1,
              explain: "The upper boundary is Q3 + 1.5 * IQR. Values above this are classified as outliers."
            }
          ]
        },
        {
          title: "SciPy Stats Module Foundations",
          id: "notes-scipy-stats",
          file: "content/notes-scipy-stats.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Which SciPy stats function computes the Cumulative Distribution Function (CDF)?",
              options: [
                "stats.norm.pdf(x)",
                "stats.norm.cdf(x)",
                "stats.norm.ppf(q)",
                "stats.norm.rvs(size)"
              ],
              answer: 1,
              explain: "stats.norm.cdf(x) returns the probability that a random variable is less than or equal to x."
            },
            {
              q: "What test statistic compares the means of two independent groups?",
              options: [
                "stats.ttest_1samp()",
                "stats.ttest_ind()",
                "stats.ttest_rel()",
                "stats.chi2_contingency()"
              ],
              answer: 1,
              explain: "stats.ttest_ind() executes an independent two-sample t-test."
            },
            {
              q: "In a Chi-Square test of independence, which function is used?",
              options: [
                "stats.chi2.pdf()",
                "stats.chi2_contingency()",
                "stats.f_oneway()",
                "stats.pearsonr()"
              ],
              answer: 1,
              explain: "stats.chi2_contingency() parses contingency tables to test variable independence."
            }
          ]
        },
        {
          title: "Data Analysis Lifecycle & Methods",
          id: "slides-data-analysis",
          file: "content/slides-data-analysis.html",
          type: "slides",
          readTime: 4,
          quiz: [
            {
              q: "Which lifecycle phase focuses on cleaning missing values and validating data schemas?",
              options: [
                "Ask",
                "Prepare",
                "Process",
                "Analyze"
              ],
              answer: 2,
              explain: "The 'Process' phase is where cleaning, transformations, and missing value logic occur."
            },
            {
              q: "What type of analysis answers 'Why did it happen?'",
              options: [
                "Descriptive Analytics",
                "Diagnostic Analytics",
                "Predictive Analytics",
                "Prescriptive Analytics"
              ],
              answer: 1,
              explain: "Diagnostic analytics investigates cause-and-effect correlation factors."
            },
            {
              q: "Which metric is highly resistant to outlier skewness?",
              options: [
                "Arithmetic Mean",
                "Median",
                "Standard Deviation",
                "Range"
              ],
              answer: 1,
              explain: "The median represents the exact 50th percentile rank and is unaffected by extreme distribution bounds."
            }
          ]
        },
        {
          title: "Jupyter Notebooks Workspace",
          id: "jupyter-notebooks-guide",
          file: "content/jupyter-notebooks-guide.html",
          type: "notes",
          readTime: 4,
          quiz: [
            {
              q: "How do you enter Command Mode in Jupyter?",
              options: [
                "Double click cell",
                "Press Enter",
                "Press Esc",
                "Press Ctrl + Shift"
              ],
              answer: 2,
              explain: "Esc puts Jupyter into Command Mode (cell operations), while Enter enters Edit Mode."
            },
            {
              q: "Which IPython magic command measures the cell execution run-time?",
              options: [
                "%timeit",
                "%%time",
                "%profile",
                "%%benchmark"
              ],
              answer: 1,
              explain: "The cell-magic %%time outputs the elapsed CPU and wall-clock times for that execution."
            },
            {
              q: "How do you convert a cell to a Markdown cell in Command Mode?",
              options: [
                "Press Y",
                "Press M",
                "Press D, D",
                "Press Shift + M"
              ],
              answer: 1,
              explain: "Press M transforms a cell to Markdown, while Y converts it back to Code."
            }
          ]
        }
      ]
    },
    {
      moduleTitle: "SQL & Python Clean-wrangling Pipelines",
      moduleId: "mod-3",
      lessons: [
        {
          title: "Advanced SQL Optimization",
          id: "sql-optimization",
          file: "content/sql-optimization.html",
          type: "notes",
          readTime: 6,
          quiz: [
            {
              q: "What is the primary advantage of CTEs (WITH clause) over subqueries?",
              options: [
                "CTEs are always faster because they are indexed automatically.",
                "CTEs improve query structure, readability, and recursion support.",
                "CTEs bypass relational primary key constraints.",
                "CTEs run in local memory whereas subqueries load from disk."
              ],
              answer: 1,
              explain: "CTEs clarify queries by breaking them down into logical sequential views, making code readable and maintainable."
            },
            {
              q: "Which window function assigns ranks to rows without leaving gaps in ranks?",
              options: [
                "RANK()",
                "DENSE_RANK()",
                "ROW_NUMBER()",
                "NTILE()"
              ],
              answer: 1,
              explain: "DENSE_RANK() assigns consecutive integer values, leaving zero gaps if duplicate scores occur."
            },
            {
              q: "What command generates query optimization statistics and plans in PostgreSQL?",
              options: [
                "EXPLAIN ANALYZE",
                "DESCRIBE QUERY",
                "OPTIMIZE SCHEMA",
                "SHOW INDEX"
              ],
              answer: 0,
              explain: "EXPLAIN ANALYZE runs the query and prints execution plans, node timing costs, and scan strategies."
            }
          ]
        },
        {
          title: "Advanced Excel Formulas",
          id: "excel-advanced-guide",
          file: "content/excel-advanced-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Which capability makes XLOOKUP superior to VLOOKUP?",
              options: [
                "It defaults to approximate matches.",
                "It can search to the left of the query key and defaults to exact match.",
                "It only works with sorted data columns.",
                "It requires specify column numbers instead of range arrays."
              ],
              answer: 1,
              explain: "XLOOKUP separates lookup arrays from return arrays, enabling vertical searches in any direction without sorting limits."
            },
            {
              q: "In INDEX/MATCH, what is the role of the MATCH function?",
              options: [
                "It extracts the exact cell value from a grid coordinate.",
                "It finds a value in a range and returns its relative position offset.",
                "It filters out rows containing duplicate text.",
                "It computes standard deviation error boundaries."
              ],
              answer: 1,
              explain: "MATCH locates the lookup value and yields its row or column integer position, which INDEX uses to output the target value."
            },
            {
              q: "What tool inside Excel handles data connection, transformations, and clean loads?",
              options: [
                "Power Query",
                "Pivot Tables",
                "Goal Seek",
                "VBA Macros"
              ],
              answer: 0,
              explain: "Power Query acts as the native ETL engine inside Excel to merge, clean, and shape tabular data inputs."
            }
          ]
        },
        {
          title: "Polars vs. Pandas 2.0 Reference",
          id: "polars-vs-pandas",
          file: "content/polars-vs-pandas.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Why does Polars achieve higher speeds than Pandas for large tables?",
              options: [
                "It operates entirely on GPUs.",
                "It is written in Rust, utilizes multi-threading, and implements lazy query graphs.",
                "It runs as a local compiled C library without a Python bridge.",
                "It converts all text columns into boolean integers."
              ],
              answer: 1,
              explain: "Polars is built in Rust using Apache Arrow, leveraging thread parallelisms and query optimizer engines."
            },
            {
              q: "In Polars, how do you specify query execution should defer until collected?",
              options: [
                "Use df.lazy()",
                "Use df.collect()",
                "Use df.execute()",
                "Use df.defer()"
              ],
              answer: 0,
              explain: ".lazy() triggers the query planner engine, and operations accumulate until .collect() executes them."
            },
            {
              q: "Which memory format standard is shared between Polars and modern data stacks?",
              options: [
                "JSON Lines",
                "Apache Arrow",
                "MessagePack",
                "HDF5"
              ],
              answer: 1,
              explain: "Apache Arrow provides the memory-efficient columnar format shared by Polars, DuckDB, and Snowflake."
            }
          ]
        }
      ]
    },
    {
      moduleTitle: "Applied Machine Learning Models",
      moduleId: "mod-4",
      lessons: [
        {
          title: "Linear Regression Foundations",
          id: "slides-regression",
          file: "content/slides-regression.html",
          type: "slides",
          readTime: 4,
          quiz: [
            {
              q: "What target metric does Ordinary Least Squares (OLS) minimize?",
              options: [
                "Sum of absolute differences.",
                "Sum of squared residuals.",
                "Maximum variance deviation.",
                "Correlation coefficients."
              ],
              answer: 1,
              explain: "OLS fits the regression line by minimizing the sum of squared differences between actual and predicted Y coordinates."
            },
            {
              q: "What does an R-squared value of 0.85 imply?",
              options: [
                "The model predicts targets accurately 85% of the time.",
                "85% of the variance in the dependent variable is explained by features.",
                "The average prediction error is 85 units.",
                "There is an 85% correlation coefficient vector."
              ],
              answer: 1,
              explain: "R-squared represents the proportion of target variance modeled by variables in the regression."
            },
            {
              q: "What violation occurs when residuals show variable patterns across X values?",
              options: [
                "Multicollinearity",
                "Heteroscedasticity",
                "Autocorrelation",
                "Underfitting"
              ],
              answer: 1,
              explain: "Heteroscedasticity is defined by non-constant residual variance across inputs, violating OLS assumptions."
            }
          ]
        },
        {
          title: "SaaS Churn Classifier Guide",
          id: "customer-churn-guide",
          file: "content/customer-churn-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What model is trained in this step-by-step classifier guide?",
              options: [
                "Decision Tree Regression",
                "Logistic Regression Classifier",
                "K-Means Clustering",
                "Naïve Bayes"
              ],
              answer: 1,
              explain: "The guide builds and evaluates a binary Logistic Regression model to classify churn risk."
            },
            {
              q: "Why is feature scaling (e.g. StandardScaler) used in this pipeline?",
              options: [
                "To reduce the number of features.",
                "To ensure coefficients are on a comparable scale.",
                "To remove empty data cells.",
                "To convert strings to integers."
              ],
              answer: 1,
              explain: "StandardScaler transforms columns to zero mean and unit variance, keeping parameters comparable."
            },
            {
              q: "If a classifier has a high precision but low recall, what is the consequence?",
              options: [
                "It flags many false alarms but catches all churners.",
                "It rarely flags false alarms but misses many actual churners.",
                "It makes predictions very quickly but with poor accuracy.",
                "The model is overfitting to training sets."
              ],
              answer: 1,
              explain: "High precision implies low False Positives (few false alarms). Low recall means high False Negatives (missed churn cases)."
            }
          ]
        },
        {
          title: "Neural Networks Foundations",
          id: "neural-networks-basics",
          file: "content/neural-networks-basics.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What is the primary purpose of activation functions in neural networks?",
              options: [
                "To speed up computations.",
                "To introduce non-linearities, allowing models to learn complex boundaries.",
                "To normalize input values between 0 and 1.",
                "To save model weights to disk."
              ],
              answer: 1,
              explain: "Activation functions introduce non-linear mappings. Stacking layers without activation would reduce to a single linear transformation."
            },
            {
              q: "Which activation function is most standard for outputting multi-class classification probabilities?",
              options: [
                "ReLU",
                "Sigmoid",
                "Softmax",
                "Tanh"
              ],
              answer: 2,
              explain: "Softmax outputs a probability distribution over multiple target classes, ensuring all output values sum to 1.0."
            },
            {
              q: "In backpropagation, what rule is used to compute error gradients relative to early layers?",
              options: [
                "The Power Rule",
                "The Chain Rule",
                "Bayes' Theorem",
                "The Product Rule"
              ],
              answer: 1,
              explain: "The Chain Rule calculates derivatives of nested functions, multiplying gradients backwards from output layers to inputs."
            }
          ]
        },
        {
          title: "NLP & Transformer Attention",
          id: "nlp-transformers-basics",
          file: "content/nlp-transformers-basics.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What is the purpose of Word Embeddings in NLP?",
              options: [
                "To count word occurrences in files.",
                "To map word tokens into dense numerical vectors representing semantic context.",
                "To correct typos and grammatical errors.",
                "To split sentences into characters."
              ],
              answer: 1,
              explain: "Word Embeddings represent word vectors in high-dimensional space where relative coordinates capture semantic similarities."
            },
            {
              q: "What mechanism allows Transformers to contextually focus on relevant words simultaneously?",
              options: [
                "Recurrent feedback loops",
                "Self-Attention mechanism",
                "Standard hidden states",
                "Vector database indexing"
              ],
              answer: 1,
              explain: "Self-Attention processes all words at once, calculating correlation weights between all words in a sentence."
            },
            {
              q: "Which model architecture represents a pure Decoder model used for auto-regressive generation?",
              options: [
                "BERT",
                "GPT / Gemini Decoders",
                "T5 Encoder-Decoder",
                "ResNet"
              ],
              answer: 1,
              explain: "GPT and Gemini decoders auto-regressively generate token predictions, predicting subsequent tokens based on preceding sequences."
            }
          ]
        },
        {
          title: "Computer Vision & CNNs",
          id: "computer-vision-basics",
          file: "content/computer-vision-basics.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "Why are Convolutional layers preferred over dense layers for processing images?",
              options: [
                "They run faster on CPUs.",
                "They retain spatial dimensions and local relationships via sliding kernel filters.",
                "They convert RGB pixels to grayscale.",
                "They require pre-sorted inputs."
              ],
              answer: 1,
              explain: "Convolutional layers preserve spatial structures by sliding filters over images, detecting shapes, edges, and textures."
            },
            {
              q: "What does Max Pooling do in a CNN pipeline?",
              options: [
                "Increases the dimensions of image vectors.",
                "Downsamples feature maps to reduce size and make features position-invariant.",
                "Applies activation functions.",
                "Normalizes color channels."
              ],
              answer: 1,
              explain: "Max Pooling extracts the maximum value within a sliding grid, reducing tensor dimensions and scaling features."
            },
            {
              q: "An RGB image grid of size 64x64 has what tensor shape?",
              options: [
                "[64, 64]",
                "[64, 64, 3]",
                "[64, 64, 1]",
                "[4096]"
              ],
              answer: 1,
              explain: "RGB images require three color channels, making the tensor shape [Height, Width, 3]."
            }
          ]
        },
        {
          title: "MLOps Pipelines & Registries",
          id: "mlops-basics-guide",
          file: "content/mlops-basics-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What MLOps task focuses on recording hyperparameters and tracking metrics over multiple runs?",
              options: [
                "Model Registry",
                "Experiment Tracking (e.g. MLflow)",
                "Data Drift Monitoring",
                "Model Deployment"
              ],
              answer: 1,
              explain: "Experiment tracking frameworks (like MLflow) log hyperparameters, evaluation metrics, and model run-times."
            },
            {
              q: "What does Model Drift refer to in production MLOps?",
              options: [
                "A decline in model accuracy due to changing real-world input distributions over time.",
                "Bugs in Docker containers.",
                "Losing connection to model databases.",
                "Rebuilding pipelines on new branches."
              ],
              answer: 0,
              explain: "Model drift occurs when real-world input profiles change compared to historical training datasets, degrading predictions."
            },
            {
              q: "Which environment validates model API integrations and runs load testing?",
              options: [
                "Development",
                "Staging",
                "Production",
                "Local Sandbox"
              ],
              answer: 1,
              explain: "Staging mimics production, testing performance, integration tests, and validating code benchmarks before live deployment."
            }
          ]
        },
        {
          title: "Feature Engineering & Preprocessing",
          id: "feature-engineering-guide",
          file: "content/feature-engineering-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "When is One-Hot Encoding preferred over Ordinal Encoding?",
              options: [
                "For high-cardinality sequential metrics.",
                "For nominal categoricals without logical ranking.",
                "For numerical columns with skewed values.",
                "To normalize distributions."
              ],
              answer: 1,
              explain: "One-hot creates binary flags for nominal groups, preventing algorithms from assuming mathematical orders."
            },
            {
              q: "Which scaling method limits values strictly between 0 and 1?",
              options: [
                "StandardScaler",
                "MinMaxScaler",
                "MaxAbsScaler",
                "RobustScaler"
              ],
              answer: 1,
              explain: "MinMaxScaler scales bounds based on range: (x - min) / (max - min), yielding values from 0 to 1."
            },
            {
              q: "Why are log transformations applied to highly skewed columns?",
              options: [
                "To make categorical columns numeric.",
                "To reduce feature skewness and help stabilize variance.",
                "To drop outlier rows automatically.",
                "To run linear classifiers."
              ],
              answer: 1,
              explain: "Log scaling compresses extreme values and stretches small numbers, converting right-skewed curves into normal distributions."
            }
          ]
        },
        {
          title: "Model Evaluation Metrics Guide",
          id: "model-evaluation-guide",
          file: "content/model-evaluation-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What metric is the harmonic mean of Precision and Recall?",
              options: [
                "Accuracy Score",
                "F1-Score",
                "ROC-AUC",
                "R-Squared"
              ],
              answer: 1,
              explain: "F1-Score balanced precision and recall. Formula: 2 * (Prec * Recall) / (Prec + Recall)."
            },
            {
              q: "What does an Area Under the ROC Curve (AUC) of 0.5 represent?",
              options: [
                "Perfect classifier performance.",
                "Performance identical to random guessing.",
                "Underfitting due to bad validation.",
                "High class imbalance bias."
              ],
              answer: 1,
              explain: "An AUC of 0.5 is a diagonal line on the ROC space, implying random choice classification."
            },
            {
              q: "Which error metric is highly sensitive to large regression outliers?",
              options: [
                "Mean Absolute Error (MAE)",
                "Mean Squared Error (MSE)",
                "Mean Absolute Percentage Error (MAPE)",
                "Residual Variance"
              ],
              answer: 1,
              explain: "MSE squares the error terms, penalizing larger outliers much more severely than MAE."
            }
          ]
        },
        {
          title: "TensorFlow Deep Learnings",
          id: "tensorflow-deep-learning",
          file: "content/tensorflow-deep-learning.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "In Keras Sequential configurations, how do you define layers?",
              options: [
                "By linking pointers in dynamic memory.",
                "By passing a sequential array of layer blocks.",
                "By writing custom gradient descent solvers.",
                "By joining views in Snowflake."
              ],
              answer: 1,
              explain: "tf.keras.Sequential builds models by stacking layers sequentially in a list array."
            },
            {
              q: "Which activation function outputs values between 0 and 1, ideal for binary classifiers?",
              options: [
                "ReLU",
                "Sigmoid",
                "Softmax",
                "Tanh"
              ],
              answer: 1,
              explain: "Sigmoid maps variables to [0,1], outputting probabilities for binary classes."
            },
            {
              q: "What optimizer scales parameters dynamically based on sliding gradient moments?",
              options: [
                "SGD (Stochastic Gradient)",
                "Adam",
                "Adadelta",
                "RMSprop"
              ],
              answer: 1,
              explain: "Adam combines momentum and root mean square updates to adjust learning rates adaptively."
            }
          ]
        },
        {
          title: "Prompt Engineering & LLM APIs",
          id: "prompt-engineering-guide",
          file: "content/prompt-engineering-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What describes Few-Shot prompting?",
              options: [
                "Querying the model multiple times rapidly.",
                "Providing specific input-output examples inside the prompt.",
                "Formatting prompt text using JSON objects.",
                "Deploying vector store indexes."
              ],
              answer: 1,
              explain: "Few-shot prompting provides sample demonstrations to guide output formats and logic patterns."
            },
            {
              q: "How does Chain-of-Thought (CoT) prompting increase answer accuracy?",
              options: [
                "By calling multiple API keys simultaneously.",
                "By prompting the model to explain its logical steps before outputting final answers.",
                "By limiting the token output length.",
                "By selecting low temperature parameters."
              ],
              answer: 1,
              explain: "CoT decomposes reasoning into explicit steps, improving complex calculations or logical deductions."
            },
            {
              q: "Which parameter controls LLM output creativity / randomness?",
              options: [
                "Top-K threshold",
                "Temperature",
                "Max Tokens",
                "Frequency Penalty"
              ],
              answer: 1,
              explain: "Temperature scales token probability scores. Higher temperature results in creative and random selections."
            }
          ]
        },
        {
          title: "LLM RAG Blueprint Architecture",
          id: "rag-blueprint",
          file: "content/rag-blueprint.html",
          type: "notes",
          readTime: 6,
          quiz: [
            {
              q: "What is the primary purpose of RAG systems?",
              options: [
                "To train custom LLMs from scratch.",
                "To augment LLM prompts with semantic context retrieved from external documents.",
                "To build faster vector hardware arrays.",
                "To translate code to SQL."
              ],
              answer: 1,
              explain: "Retrieval-Augmented Generation searches documents, extracts matching snippets, and feeds them to the LLM to ground answers."
            },
            {
              q: "Which database stores and queries text vector embeddings?",
              options: [
                "Relational Database",
                "Vector Database (e.g. Chroma, pgvector)",
                "Document Store",
                "NoSQL Ledger"
              ],
              answer: 1,
              explain: "Vector databases index embeddings to execute similarity searches (e.g. cosine distance)."
            },
            {
              q: "What metric measures the degree of match between query and document vectors?",
              options: [
                "R-Squared",
                "Cosine Similarity",
                "F1-Score",
                "MSE Error"
              ],
              answer: 1,
              explain: "Cosine similarity measures the angle between vectors, reflecting semantic closeness."
            }
          ]
        }
      ]
    },
    {
      moduleTitle: "BI Analytics & Storytelling",
      moduleId: "mod-5",
      lessons: [
        {
          title: "Tableau Calculated Fields & LODs",
          id: "tableau-dashboard-guide",
          file: "content/tableau-dashboard-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What does a FIXED Level of Detail (LOD) expression do in Tableau?",
              options: [
                "Limits calculation parameters to active view filters.",
                "Computes values at specified dimensions independent of view filter states.",
                "Applies window aggregations across database rows.",
                "Fixes chart coordinate scales."
              ],
              answer: 1,
              explain: "FIXED LODs evaluate queries at defined dimensional granularities, ignoring standard filter hierarchies."
            },
            {
              q: "How do Parameter Actions improve dashboard interactivity?",
              options: [
                "By running SQL commands on databases.",
                "By allowing user selection marks to feed values directly into variables.",
                "By resizing visual layouts automatically.",
                "By sending dashboard emails."
              ],
              answer: 1,
              explain: "Parameter Actions translate dashboard selections into parameter values, dynamically updating sheets."
            },
            {
              q: "Which calculation is evaluated on aggregated results returned from queries?",
              options: [
                "Row-level Calculations",
                "LOD Expressions",
                "Table Calculations",
                "Data Source filters"
              ],
              answer: 2,
              explain: "Table Calculations (e.g., Running Sum, Rank) compute values on visual coordinates after queries complete."
            }
          ]
        },
        {
          title: "PowerBI DAX Semantic Modeling",
          id: "powerbi-dax-guide",
          file: "content/powerbi-dax-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What is the key difference between Calculated Columns and Measures in DAX?",
              options: [
                "Columns are calculated on user clicks; Measures are static.",
                "Columns compute row-by-row on data load; Measures compute dynamically during visualization rendering.",
                "Measures consume database memory; Columns do not.",
                "Columns are written in SQL; Measures in Python."
              ],
              answer: 1,
              explain: "Columns evaluate row values during data refreshes. Measures execute dynamically based on the visual filter context."
            },
            {
              q: "Which DAX function overrides or overrides active filter contexts?",
              options: [
                "SUMX",
                "CALCULATE",
                "FILTER",
                "RELATED"
              ],
              answer: 1,
              explain: "CALCULATE modifies contextual filters, enabling operations like total margin computations or YoY compares."
            },
            {
              q: "Which class of DAX functions handles YTD and period-over-period measures?",
              options: [
                "Statistical Functions",
                "Logical Functions",
                "Time Intelligence Functions",
                "Information Functions"
              ],
              answer: 2,
              explain: "Time intelligence handles calculations over calendar dimensions (e.g. TOTALYTD, SAMEPERIODLASTYEAR)."
            }
          ]
        },
        {
          title: "Looker LookML Semantic Modeling",
          id: "looker-lookml-guide",
          file: "content/looker-lookml-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What represents the main purpose of Looker's LookML language?",
              options: [
                "To write database query commands directly.",
                "To build semantic schemas and relationships governing raw SQL tables.",
                "To style dashboard chart layouts.",
                "To index memory caches."
              ],
              answer: 1,
              explain: "LookML translates metadata schemas into optimized SQL queries when users request dashboard items."
            },
            {
              q: "In LookML, what block is declared to model relationships and table joins?",
              options: [
                "View",
                "Explore",
                "Model",
                "Dimension"
              ],
              answer: 1,
              explain: "Explores contain the join relationships and query definitions exposed to the drag-and-drop UI."
            },
            {
              q: "What block corresponds to a single database column or attribute?",
              options: [
                "Measure",
                "Dimension",
                "Parameter",
                "Filter"
              ],
              answer: 1,
              explain: "Dimensions represent columns or attributes, while Measures represent mathematical SQL aggregations."
            }
          ]
        },
        {
          title: "dbt Core & Fact Star Schema Design",
          id: "dbt-star-schema",
          file: "content/dbt-star-schema.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What transformation steps are handled by dbt Core?",
              options: [
                "Extract and Load",
                "Transform (in-warehouse transformation)",
                "Dashboard rendering",
                "Database backups"
              ],
              answer: 1,
              explain: "dbt targets the T (Transform) in ETL, compiling SELECT queries into views and tables in the warehouse."
            },
            {
              q: "In a Star Schema, what represents the central table holding transaction values?",
              options: [
                "Dimension Table",
                "Fact Table",
                "Index View",
                "Log Store"
              ],
              answer: 1,
              explain: "Fact tables contain quantitative transactional metrics and keys linking to descriptive Dimension tables."
            },
            {
              q: "Which command runs model scripts and builds schemas in dbt?",
              options: [
                "dbt build",
                "dbt run",
                "dbt compile",
                "dbt deploy"
              ],
              answer: 1,
              explain: "dbt run executes the transformation SQL files, building tables or views in the target database schema."
            }
          ]
        },
        {
          title: "Airflow DAGs & Data Pipelines",
          id: "airflow-pipelines-guide",
          file: "content/airflow-pipelines-guide.html",
          type: "notes",
          readTime: 5,
          quiz: [
            {
              q: "What does DAG represent in Airflow design?",
              options: [
                "Direct Automated Gateway",
                "Directed Acyclic Graph",
                "Database Analytics Group",
                "Distribution Array Grid"
              ],
              answer: 1,
              explain: "Directed Acyclic Graphs map dependencies, ensuring tasks execute in ordered, non-looping workflows."
            },
            {
              q: "Which operator is used to trigger a Python script task in a DAG?",
              options: [
                "BashOperator",
                "PythonOperator",
                "MySqlOperator",
                "DummyOperator"
              ],
              answer: 1,
              explain: "PythonOperator takes python_callable references to run functions as pipeline tasks."
            },
            {
              q: "How are task execution dependencies defined in Airflow DAG scripts?",
              options: [
                "Using conditional if statements.",
                "Using bitwise operators (e.g. task1 >> task2).",
                "By sorting variables alphabetically.",
                "By running SQL queries."
              ],
              answer: 1,
              explain: "Bitwise operators like >> and << explicitly declare task dependencies and execution sequences."
            }
          ]
        }
      ]
    }
  ];

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  let currentTopicId = null;
  let activeQuizQuestions = [];

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  const sidebarMenu = document.getElementById('sidebar-menu');
  const activeTopicTitle = document.getElementById('active-topic-title');
  const breadcrumbModule = document.getElementById('breadcrumb-module');
  const readingTimeVal = document.getElementById('reading-time-val');
  const contentContainer = document.getElementById('content-container');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');
  
  const quizCard = document.getElementById('quiz-card');
  const quizQuestionsContainer = document.getElementById('quiz-questions-container');
  const quizSubmitBtn = document.getElementById('quiz-submit-btn');
  const quizMessage = document.getElementById('quiz-message');
  const quizToast = document.getElementById('quiz-toast');

  const sidebarOpenBtn = document.getElementById('sidebar-open');
  const sidebarCloseBtn = document.getElementById('sidebar-close');
  const workspaceSidebar = document.getElementById('workspace-sidebar');

  // ==========================================
  // SIDEBAR NAVIGATION RENDERING
  // ==========================================
  function renderSidebar() {
    sidebarMenu.innerHTML = '';
    
    syllabus.forEach((module, mIdx) => {
      const moduleDiv = document.createElement('div');
      moduleDiv.className = 'menu-module';
      
      const header = document.createElement('div');
      header.className = 'module-header';
      header.innerHTML = `
        <span>M${mIdx < 10 ? '0' + mIdx : mIdx}: ${module.moduleTitle}</span>
        <span>▼</span>
      `;
      
      const lessonsList = document.createElement('ul');
      lessonsList.className = 'module-lessons';
      
      module.lessons.forEach(lesson => {
        const li = document.createElement('li');
        
        const isCompleted = isTopicCompleted(lesson.id);
        const isActive = lesson.id === currentTopicId;
        
        const itemLink = document.createElement('a');
        itemLink.className = `lesson-link ${isActive ? 'active' : ''}`;
        itemLink.setAttribute('data-id', lesson.id);
        
        const checkbox = document.createElement('span');
        checkbox.className = `lesson-checkbox ${isCompleted ? 'completed' : ''}`;
        checkbox.innerHTML = isCompleted ? '✓' : '';
        checkbox.setAttribute('data-check-id', lesson.id);
        
        checkbox.addEventListener('click', (e) => {
          e.stopPropagation(); // prevent loading topic on check click
          toggleTopicCompleted(lesson.id);
          renderSidebar();
          updateProgress();
        });

        const titleSpan = document.createElement('span');
        titleSpan.textContent = lesson.title;
        
        itemLink.appendChild(checkbox);
        itemLink.appendChild(titleSpan);
        
        itemLink.addEventListener('click', () => {
          loadTopic(lesson.id);
        });
        
        li.appendChild(itemLink);
        lessonsList.appendChild(li);
      });
      
      moduleDiv.appendChild(header);
      moduleDiv.appendChild(lessonsList);
      sidebarMenu.appendChild(moduleDiv);

      // Accordion toggle behavior
      header.addEventListener('click', () => {
        const isHidden = lessonsList.style.display === 'none';
        lessonsList.style.display = isHidden ? 'flex' : 'none';
        header.querySelector('span:last-child').textContent = isHidden ? '▼' : '▶';
      });
    });
  }

  // ==========================================
  // PROGRESS TRACKING LOGIC (LOCAL STORAGE)
  // ==========================================
  function getCompletedTopics() {
    const data = localStorage.getItem('statiq_completed_topics');
    return data ? JSON.parse(data) : [];
  }

  function isTopicCompleted(topicId) {
    return getCompletedTopics().includes(topicId);
  }

  function toggleTopicCompleted(topicId) {
    let completed = getCompletedTopics();
    if (completed.includes(topicId)) {
      completed = completed.filter(id => id !== topicId);
    } else {
      completed.push(topicId);
    }
    localStorage.setItem('statiq_completed_topics', JSON.stringify(completed));
  }

  function markTopicCompleted(topicId) {
    let completed = getCompletedTopics();
    if (!completed.includes(topicId)) {
      completed.push(topicId);
      localStorage.setItem('statiq_completed_topics', JSON.stringify(completed));
    }
  }

  function updateProgress() {
    const totalLessons = syllabus.reduce((sum, mod) => sum + mod.lessons.length, 0);
    const completedLessons = getCompletedTopics().length;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    progressPercent.textContent = `${percentage}%`;
    progressBarFill.style.width = `${percentage}%`;
  }

  // ==========================================
  // TOPIC LOAD AND RENDER
  // ==========================================
  function getLessonInfo(topicId) {
    for (const mod of syllabus) {
      const lesson = mod.lessons.find(l => l.id === topicId);
      if (lesson) return { lesson, module: mod };
    }
    return null;
  }

  function loadTopic(topicId) {
    const info = getLessonInfo(topicId);
    if (!info) {
      loadDefaultTopic();
      return;
    }

    currentTopicId = topicId;
    const { lesson, module } = info;
    
    // Update breadcrumbs and titles
    breadcrumbModule.textContent = module.moduleTitle;
    activeTopicTitle.textContent = lesson.title;
    readingTimeVal.textContent = lesson.readTime;
    
    // Update URL query parameters silently
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?topic=${topicId}`;
    window.history.pushState({ path: newurl }, '', newurl);

    // Render active state in sidebar
    renderSidebar();

    // Fetch and display note contents
    contentContainer.innerHTML = '<div style="text-align:center; padding: 60px; color: var(--text-dark);"><p>Loading lesson content...</p></div>';
    quizCard.style.display = 'none';

    if (lesson.type === 'slides') {
      // Slides load best in isolated iframe to keep its internal slide layout script working
      contentContainer.innerHTML = `<iframe class="viewport-iframe" src="${lesson.file}"></iframe>`;
      setupQuiz(lesson);
      // Scroll viewport back to top
      document.getElementById('viewport-scroll-area').scrollTop = 0;
    } else {
      fetch(lesson.file)
        .then(response => {
          if (!response.ok) throw new Error("File not found");
          return response.text();
        })
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // Select content elements (everything inside container, omitting the home back button and top badge)
          const content = doc.querySelector('.container');
          if (content) {
            // Remove back button and tags
            const backBtn = content.querySelector('.back-btn');
            if (backBtn) backBtn.remove();
            const badge = content.querySelector('.badge');
            if (badge) badge.remove();
            
            // Clean title
            const h1 = content.querySelector('h1');
            if (h1) h1.remove();

            // Wrap in styled reader wrapper
            contentContainer.innerHTML = `<div class="note-body-wrapper">${content.innerHTML}</div>`;
            
            // Add Copy Code Buttons to code blocks
            setupCodeBlocks();
            
            // Render the quiz
            setupQuiz(lesson);
          } else {
            contentContainer.innerHTML = `<div style="padding: 20px; color: var(--warning);"><p>Could not format guide correctly. Try opening directly: <a href="${lesson.file}" target="_blank">Direct Link</a></p></div>`;
          }
          
          // Scroll viewport back to top
          document.getElementById('viewport-scroll-area').scrollTop = 0;
        })
        .catch(err => {
          contentContainer.innerHTML = `
            <div style="padding: 40px; text-align:center; color: var(--text-dark);">
              <p style="font-size:1.1rem; color: #ef4444;">Error loading learning material.</p>
              <p style="font-size:0.85rem; margin-top:10px;">Ensure files are served by local server or check the file endpoint.</p>
            </div>
          `;
          console.error(err);
        });
    }
  }

  function loadDefaultTopic() {
    // If no topic query param exists, load the first lesson in the curriculum
    const firstLesson = syllabus[0].lessons[0];
    loadTopic(firstLesson.id);
  }

  // ==========================================
  // COPY CODE TRIGGERS
  // ==========================================
  function setupCodeBlocks() {
    const blocks = contentContainer.querySelectorAll('pre');
    blocks.forEach(block => {
      // Append copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      block.appendChild(copyBtn);
      
      copyBtn.addEventListener('click', () => {
        const code = block.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
          }, 2000);
        });
      });
    });
  }

  // ==========================================
  // INTERACTIVE LESSON QUIZZES
  // ==========================================
  function setupQuiz(lesson) {
    if (!lesson.quiz || lesson.quiz.length === 0) {
      quizCard.style.display = 'none';
      return;
    }

    activeQuizQuestions = lesson.quiz;
    quizCard.style.display = 'block';
    quizQuestionsContainer.innerHTML = '';
    
    // Reset message
    quizMessage.textContent = 'Select your answers for all questions.';
    quizMessage.className = 'quiz-message';
    quizSubmitBtn.disabled = false;
    quizSubmitBtn.innerHTML = 'Verify Answers';

    activeQuizQuestions.forEach((q, qIdx) => {
      const qBlock = document.createElement('div');
      qBlock.className = 'quiz-question-block';
      qBlock.innerHTML = `<h4>Q${qIdx + 1}: ${q.q}</h4>`;
      
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';
      
      q.options.forEach((opt, oIdx) => {
        const letters = ['A', 'B', 'C', 'D'];
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.setAttribute('data-qidx', qIdx);
        optionBtn.setAttribute('data-oidx', oIdx);
        
        optionBtn.innerHTML = `
          <span class="quiz-option-letter">${letters[oIdx]}</span>
          <span>${opt}</span>
        `;
        
        optionBtn.addEventListener('click', () => {
          // Clear previous selection in this question block
          optionsDiv.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
          optionBtn.classList.add('selected');
        });
        
        optionsDiv.appendChild(optionBtn);
      });
      
      // Feedback area
      const feedbackDiv = document.createElement('div');
      feedbackDiv.className = 'quiz-feedback';
      feedbackDiv.setAttribute('data-fidx', qIdx);
      
      qBlock.appendChild(optionsDiv);
      qBlock.appendChild(feedbackDiv);
      quizQuestionsContainer.appendChild(qBlock);
    });
  }

  // Handle quiz validation
  if (quizSubmitBtn) {
    quizSubmitBtn.addEventListener('click', () => {
      const selectedOptions = quizQuestionsContainer.querySelectorAll('.quiz-option.selected');
      
      if (selectedOptions.length < activeQuizQuestions.length) {
        quizMessage.textContent = 'Please answer all questions before submitting.';
        quizMessage.className = 'quiz-message error';
        return;
      }

      let allCorrect = true;

      selectedOptions.forEach(opt => {
        const qIdx = parseInt(opt.getAttribute('data-qidx'));
        const oIdx = parseInt(opt.getAttribute('data-oidx'));
        const correctIndex = activeQuizQuestions[qIdx].answer;
        const feedbackDiv = quizQuestionsContainer.querySelector(`.quiz-feedback[data-fidx="${qIdx}"]`);
        
        const optionsInBlock = opt.parentElement.querySelectorAll('.quiz-option');

        if (oIdx === correctIndex) {
          opt.classList.add('correct');
          feedbackDiv.textContent = `✓ Correct! ${activeQuizQuestions[qIdx].explain}`;
          feedbackDiv.className = 'quiz-feedback show-correct';
        } else {
          opt.classList.add('incorrect');
          allCorrect = false;
          
          // Highlight correct one
          optionsInBlock[correctIndex].classList.add('correct');
          
          feedbackDiv.textContent = `✕ Incorrect. ${activeQuizQuestions[qIdx].explain}`;
          feedbackDiv.className = 'quiz-feedback show-incorrect';
        }
      });

      // Disable buttons to lock choices
      quizQuestionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
        btn.style.pointerEvents = 'none';
      });

      if (allCorrect) {
        quizMessage.textContent = 'Awesome job! You answered all questions correctly.';
        quizMessage.className = 'quiz-message success';
        quizSubmitBtn.innerHTML = 'Completed ✓';
        quizSubmitBtn.disabled = true;

        // Mark completed in database
        markTopicCompleted(currentTopicId);
        
        // Success Toast Notification
        quizToast.classList.add('active');
        setTimeout(() => {
          quizToast.classList.remove('active');
        }, 4000);

        // Update progress bar
        updateProgress();
        renderSidebar();
      } else {
        quizMessage.textContent = 'Some answers are incorrect. Review the explanations and reload the page to retry.';
        quizMessage.className = 'quiz-message error';
        quizSubmitBtn.innerHTML = 'Retry Quiz';
        quizSubmitBtn.disabled = false;
        
        // Switch functionality of button to reset
        quizSubmitBtn.onclick = () => {
          loadTopic(currentTopicId);
          quizSubmitBtn.onclick = null; // restore default event
        };
      }
    });
  }

  // ==========================================
  // MOBILE MENU TOGGLES
  // ==========================================
  if (sidebarOpenBtn && sidebarCloseBtn && workspaceSidebar) {
    sidebarOpenBtn.addEventListener('click', () => {
      workspaceSidebar.classList.add('mobile-open');
    });

    sidebarCloseBtn.addEventListener('click', () => {
      workspaceSidebar.classList.remove('mobile-open');
    });
  }

  // ==========================================
  // INITIALIZATION RUN
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get('topic');
  
  if (topicParam) {
    currentTopicId = topicParam;
    loadTopic(topicParam);
  } else {
    loadDefaultTopic();
  }

  updateProgress();
});
