import sys
from engine import (
    vector_dot_product,
    vector_magnitude,
    vector_cosine_similarity,
    matrix_transpose,
    matrix_multiply,
    polynomial_derivative,
    evaluate_polynomial,
    optimize_loss
)

def run_tests():
    print("[*] Running Matrix Transformation Engine tests...")
    
    # 1. Test Vector operations
    assert vector_dot_product([1, 2], [3, 4]) == 11, "Failed Vector Dot Product"
    assert vector_magnitude([3, 4]) == 5.0, "Failed Vector Magnitude"
    assert vector_cosine_similarity([1, 0], [0, 1]) == 0.0, "Failed Cosine Similarity (Orthogonal)"
    assert abs(vector_cosine_similarity([3, 4], [6, 8]) - 1.0) < 1e-9, "Failed Cosine Similarity (Colinear)"
    print("    [✓] Vector tests passed.")
    
    # 2. Test Matrix operations
    A = [[1, 2], [3, 4]]
    A_t = [[1, 3], [2, 4]]
    assert matrix_transpose(A) == A_t, "Failed Matrix Transpose"
    
    B = [[2, 0], [1, 2]]
    # A @ B = [[1*2+2*1, 1*0+2*2], [3*2+4*1, 3*0+4*2]] = [[4, 4], [10, 8]]
    assert matrix_multiply(A, B) == [[4, 4], [10, 8]], "Failed Matrix Multiplication"
    print("    [✓] Matrix tests passed.")
    
    # 3. Test Calculus operations
    # f(x) = 4 + 3x + x^2 -> coeff = [4, 3, 1]
    # f'(x) = 3 + 2x -> coeff = [3, 2]
    df = polynomial_derivative([4, 3, 1])
    assert df == [3, 2], "Failed Polynomial Derivative coefficients"
    assert evaluate_polynomial(df, 5) == 13, "Failed Polynomial evaluation"
    print("    [✓] Calculus tests passed.")
    
    # 4. Test Gradient Descent optimization
    final_w, _ = optimize_loss(w_start=1.0, learning_rate=0.2, epochs=25)
    # With w_start=1.0, LR=0.2, gradient descent update is: w = w - 0.2 * 2 * (w - 7) = w - 0.4(w - 7) = 0.6w + 2.8
    # Analytical convergence yields w -> 7.000.
    # Assert final parameter w is very close to 7.0
    assert abs(final_w - 7.0) < 1e-4, f"Failed Optimization convergence. w = {final_w}"
    print("    [✓] Optimization tests passed.")
    
    print("\n[SUCCESS] All unit tests completed successfully!")

if __name__ == "__main__":
    try:
        run_tests()
    except AssertionError as err:
        print(f"\n[FAIL] Test assertion failed: {err}")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {e}")
        sys.exit(1)
