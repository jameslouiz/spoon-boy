import Matrix from "./index";

const toArray = matrix => {
  return matrix.reduce((acc, row) => {
    row.forEach(col => acc.push(col));
    return acc;
  }, []);
};

describe("Matrix Class", () => {
  it("Should create and instance of the matrix class", () => {
    const matrix = new Matrix();

    expect(matrix instanceof Matrix);
  });

  it("Should create a matrix of the correct shape", () => {
    const cols = 4;
    const rows = 5;
    const matrix = new Matrix(rows, cols);

    expect(matrix.cols).toBe(cols);
    expect(matrix.rows).toBe(rows);
    expect(matrix.data).toHaveLength(rows);
    expect(matrix.data[0]).toHaveLength(cols);
  });

  it("Should create a matrix fill with the correct values", () => {
    const cols = 4;
    const rows = 5;
    const fill = 100;
    const matrix = new Matrix(rows, cols, fill);

    toArray(matrix.data).forEach(n => {
      expect(n).toBe(fill);
    });
  });

  describe("Scalar operations", () => {
    describe("Add", () => {
      it("Should perform scalar add to matrix", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const add = 5;

        matrix.add(add);

        toArray(matrix.data).forEach(n => {
          expect(n).toBe(add);
        });
      });

      it("Should throw if argument is not a number", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const add = "not a number";
        const fn = () => matrix.add(add);

        expect(fn).toThrow();
      });
    });

    describe("Subtract", () => {
      it("Should perform scalar subtract to matrix", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const subtract = 5;

        matrix.subtract(subtract);

        toArray(matrix.data).forEach(n => {
          expect(n).toBe(0 - subtract);
        });
      });

      it("Should throw if argument is not a number", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const subtract = "not a number";
        const fn = () => matrix.subtract(subtract);

        expect(fn).toThrow();
      });
    });

    describe("Division", () => {
      it("Should perform scalar division to matrix", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const divideBy = 5;
        const add = 20;

        matrix.add(add);
        matrix.divide(divideBy);

        toArray(matrix.data).forEach(n => {
          expect(n).toBe(add / divideBy);
        });
      });

      it("Should throw if argument is not a number", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const division = "not a number";
        const fn = () => matrix.divide(division);

        expect(fn).toThrow();
      });
    });

    describe("Multiplication", () => {
      it("Should perform scalar multiplication to matrix", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const multiplyBy = 5;
        const add = 20;

        matrix.add(add);
        matrix.multiply(multiplyBy);

        toArray(matrix.data).forEach(n => {
          expect(n).toBe(add * multiplyBy);
        });
      });

      it("Should throw if argument is not a number", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const muliplier = "not a number";
        const fn = () => matrix.multiply(muliplier);

        expect(fn).toThrow();
      });
    });

    describe("Map", () => {
      it("Should map the function to every value in the matrix", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const newValue = 99;

        matrix.map(n => newValue);

        toArray(matrix.data).forEach(n => {
          expect(n).toBe(newValue);
        });
      });

      it("Should throw if argument is not a function", () => {
        const cols = 4;
        const rows = 4;
        const matrix = new Matrix(cols, rows);
        const muliplier = "not a function";
        const fn = () => matrix.map(muliplier);

        expect(fn).toThrow();
      });
    });

    describe("Random", () => {
      it("Should replace all values in the matrix with random values", () => {
        const cols = 4;
        const rows = 4;
        const fill = 100;
        const matrix = new Matrix(rows, cols, fill);
        const asArray = toArray(matrix.data);

        matrix.randomize();

        expect(toArray(matrix.data)).toHaveLength(cols * rows);
        toArray(matrix.data).forEach(n => {
          expect(n).not.toBe(fill);
        });
      });
    });
  });

  describe("Elementwise operations", () => {
    describe("Add", () => {
      it("Should add each element of matrix A to each element of matrix B", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 2);
        const base = 5;

        A.add(base);
        B.add(base);

        const C = Matrix.add(A, B);

        toArray(C.data).forEach(n => {
          expect(n).toBe(base + base);
        });
      });

      it("Should throw if A or B are not instance of Matrix", () => {
        const A = new Matrix(3, 2);
        const B = [];
        const fn = () => Matrix.add(A, B);

        expect(fn).toThrow();
      });

      it("Should throw if A or B are not the same shape", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 6);
        const fn = () => Matrix.add(A, B);

        expect(fn).toThrow();
      });
    });

    describe("Subtract", () => {
      it("Should subtract each element of matrix A from each element of matrix B", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 2);
        const base = 5;

        A.add(base);
        B.add(base);

        const C = Matrix.subtract(A, B);

        toArray(C.data).forEach(n => {
          expect(n).toBe(base - base);
        });
      });

      it("Should throw if A or B are not instance of Matrix", () => {
        const A = new Matrix(3, 2);
        const B = [];
        const fn = () => Matrix.subtract(A, B);

        expect(fn).toThrow();
      });

      it("Should throw if A or B are not the same shape", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 6);
        const fn = () => Matrix.subtract(A, B);

        expect(fn).toThrow();
      });
    });

    describe("Divide", () => {
      it("Should divide each element of matrix A from each element of matrix B", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 2);
        const base = 5;

        A.add(base);
        B.add(base);

        const C = Matrix.divide(A, B);

        toArray(C.data).forEach(n => {
          expect(n).toBe(base / base);
        });
      });

      it("Should throw if A or B are not instance of Matrix", () => {
        const A = new Matrix(3, 2);
        const B = [];
        const fn = () => Matrix.subtract(A, B);

        expect(fn).toThrow();
      });

      it("Should throw if A or B are not the same shape", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 6);
        const fn = () => Matrix.subtract(A, B);

        expect(fn).toThrow();
      });
    });

    describe("Multiply", () => {
      it("Should multiply each element of matrix A with each element of matrix B", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 2);
        const base = 5;

        A.add(base);
        B.add(base);

        const C = Matrix.multiply(A, B);

        toArray(C.data).forEach(n => {
          expect(n).toBe(base * base);
        });
      });

      it("Should throw if A or B are not instance of Matrix", () => {
        const A = new Matrix(3, 2);
        const B = [];
        const fn = () => Matrix.subtract(A, B);

        expect(fn).toThrow();
      });

      it("Should throw if A or B are not the same shape", () => {
        const A = new Matrix(3, 2);
        const B = new Matrix(3, 6);
        const fn = () => Matrix.subtract(A, B);

        expect(fn).toThrow();
      });
    });
  });

  describe("Matrice operations", () => {
    describe("Dot", () => {
      it("Should return a new matrix C that is the product of 2 Matrices", () => {
        const A = new Matrix(2, 3);
        const B = new Matrix(3, 2);

        A.add(20);
        B.add(20);

        const C = Matrix.dot(A, B);

        toArray(C.data).forEach(n => {
          expect(n).toBe(1200);
        });
      });
    });
  });
});
