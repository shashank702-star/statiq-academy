# Project 01: Matrix Transformation Engine

This project is a lightweight, pure-Python mathematical library (built without NumPy or other external dependencies) demonstrating vector similarity calculations, matrix transpositions and multiplications, polynomial calculus derivatives, and an iterative Gradient Descent optimization loop from scratch.

## 📐 Mathematical Equations Implemented

### 1. Vector Operations
*   **Vector Dot Product**: Sum of products of matching elements:
    $$v \cdot w = \sum_{i=1}^n v_i w_i$$
*   **Euclidean Norm (Magnitude)**: Length of a vector from origin:
    $$\|v\| = \sqrt{\sum_{i=1}^n v_i^2}$$
*   **Cosine Similarity**: Measures the cosine of the angle between vectors (values between -1 and 1):
    $$\text{Similarity}(v, w) = \frac{v \cdot w}{\|v\| \|w\|}$$

### 2. Matrix Operations
*   **Matrix Transpose**: Swapping rows and columns:
    $$A^T_{j,i} = A_{i,j}$$
*   **Matrix Multiplication**: Dot product of rows of A and columns of B:
    $$C_{i,j} = \sum_{k=1}^n A_{i,k} B_{k,j}$$

### 3. Calculus & Optimization
*   **Power Rule Derivative**: Finding rates of change of polynomial equations:
    $$\frac{d}{dx}(c \cdot x^n) = n \cdot c \cdot x^{n-1}$$
*   **Gradient Descent Optimization**: Iterative update parameter shift to minimize the quadratic loss function $L(w) = (w - 7)^2 + 3$:
    $$w_{new} = w_{old} - \eta \cdot \frac{\partial L}{\partial w}$$
    $$\frac{\partial L}{\partial w} = 2(w - 7)$$

## 📂 File Structure
*   `engine.py`: Pure-Python library implementation.
*   `test_engine.py`: Self-contained verification tests.
*   `README.md`: Mathematical definitions and run manual.

## 🚀 Execution Instructions

Run the engine demo script from your terminal:
```bash
python engine.py
```

Run the unit verification tests:
```bash
python test_engine.py
```
Upon successful execution, all assertions will pass, printing a success statement in your console.
