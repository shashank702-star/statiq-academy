import math

# ==========================================
# 1. VECTOR OPERATIONS
# ==========================================

def vector_dot_product(v, w):
    """Computes the dot product of two vectors: sum(v_i * w_i)."""
    if len(v) != len(w):
        raise ValueError("Vectors must be of equal dimensions.")
    return sum(v_i * w_i for v_i, w_i in zip(v, w))

def vector_magnitude(v):
    """Computes the Euclidean norm (magnitude) of a vector: sqrt(sum(v_i^2))."""
    return math.sqrt(sum(v_i**2 for v_i in v))

def vector_cosine_similarity(v, w):
    """Computes the cosine similarity of two vectors: dot(v,w) / (norm(v) * norm(w))."""
    mag_v = vector_magnitude(v)
    mag_w = vector_magnitude(w)
    if mag_v == 0 or mag_w == 0:
        return 0.0
    return vector_dot_product(v, w) / (mag_v * mag_w)

# ==========================================
# 2. MATRIX OPERATIONS
# ==========================================

def matrix_transpose(matrix):
    """Transposes a 2D matrix (swaps rows and columns)."""
    if not matrix or not matrix[0]:
        return []
    rows = len(matrix)
    cols = len(matrix[0])
    transposed = [[0 for _ in range(rows)] for _ in range(cols)]
    for r in range(rows):
        for c in range(cols):
            transposed[c][r] = matrix[r][c]
    return transposed

def matrix_multiply(A, B):
    """Multiplies two matrices A (m x n) and B (n x p) -> C (m x p)."""
    rows_A = len(A)
    cols_A = len(A[0])
    rows_B = len(B)
    cols_B = len(B[0])
    
    if cols_A != rows_B:
        raise ValueError(f"Incompatible dimensions for multiplication: A ({rows_A}x{cols_A}), B ({rows_B}x{cols_B})")
        
    C = [[0 for _ in range(cols_B)] for _ in range(rows_A)]
    
    for i in range(rows_A):
        for j in range(cols_B):
            # Compute dot product of row i of A and column j of B
            dot_val = sum(A[i][k] * B[k][j] for k in range(cols_A))
            C[i][j] = dot_val
            
    return C

# ==========================================
# 3. CALCULUS & GRADIETS
# ==========================================

def polynomial_derivative(coefficients):
    """
    Computes the derivative coefficients of a polynomial:
    Given [c0, c1, c2, c3] representing: c0 + c1*x + c2*x^2 + c3*x^3
    Yields derivative coefficients matching the Power Rule.
    """
    derivative = []
    # Using Power Rule: d/dx( c_n * x^n ) = n * c_n * x^(n-1)
    for power in range(1, len(coefficients)):
        derivative.append(power * coefficients[power])
    # If polynomial was constant, derivative is [0]
    return derivative if derivative else [0]

def evaluate_polynomial(coefficients, x):
    """Evaluates a polynomial representation at point x."""
    total = 0.0
    for power, coef in enumerate(coefficients):
        total += coef * (x ** power)
    return total

# ==========================================
# 4. GRADIENT DESCENT OPTIMIZATION
# ==========================================

def optimize_loss(w_start, learning_rate, epochs):
    """
    Gradient descent optimizer.
    Minimizes the quadratic loss function: Loss(w) = (w - 7)^2 + 3
    The derivative of loss w.r.t w is: dLoss/dw = 2 * (w - 7)
    Minimum is at w = 7 where Loss = 3.
    """
    print(f"[*] Starting Optimization (w_start={w_start}, learning_rate={learning_rate})")
    w = w_start
    history = []
    
    for epoch in range(1, epochs + 1):
        loss = (w - 7)**2 + 3
        # Compute gradient (partial derivative)
        gradient = 2 * (w - 7)
        
        # Log state
        history.append((epoch, w, loss, gradient))
        if epoch <= 5 or epoch % 5 == 0 or epoch == epochs:
            print(f"    Epoch {epoch:02d}: w = {w:7.4f} | Loss = {loss:7.4f} | Gradient = {gradient:8.4f}")
            
        # Update rule: w_new = w_old - learning_rate * gradient
        w = w - learning_rate * gradient
        
    print(f"[✓] Optimization complete. Final parameter w = {w:.4f} (Optimal is 7.00)")
    return w, history

if __name__ == "__main__":
    print("="*50)
    print("       MATRIX TRANSFORMATION ENGINE DEMO")
    print("="*50)
    
    # 1. Vector similarity
    v = [1, 2, 3]
    w = [2, 4, 6] # same direction, double magnitude
    print(f"Vector Similarity: {vector_cosine_similarity(v, w):.4f} (Expected: 1.0000)")
    
    # 2. Matrix transpose and multiplication
    matrix = [[1, 2], [3, 4]]
    print("Transpose:", matrix_transpose(matrix))
    print("A @ A_T:", matrix_multiply(matrix, matrix_transpose(matrix)))
    
    # 3. Calculus
    # f(x) = 2x^2 + 5x + 3 -> represented as [3, 5, 2]
    f_x = [3, 5, 2]
    # f'(x) = 4x + 5 -> represented as [5, 4]
    df_x = polynomial_derivative(f_x)
    print(f"f'(x) coefficients of 2x^2 + 5x + 3: {df_x} (Expected: [5, 4])")
    print(f"f'(3.5) = {evaluate_polynomial(df_x, 3.5)} (Expected: 19.0)")
    
    # 4. Optimization
    print("-"*50)
    optimize_loss(w_start=1.0, learning_rate=0.1, epochs=20)
    print("="*50 + "\n")
