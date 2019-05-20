const buildMatrix = (rows = 2, cols = 2, fill) => {
  return Array(rows).fill(Array(cols).fill(fill));
};

const isFunction = functionToCheck => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

class Matrix {
  constructor(rows = 2, cols = 2, fill = 0) {
    this.cols = cols;
    this.rows = rows;
    this.data = buildMatrix(rows, cols, fill);
    this.size = cols * rows;
  }

  static add(a, b) {
    if (!a instanceof Matrix || !b instanceof Matrix) {
      throw new Error(`${a} or ${b} are not instances of Matrix`);
    }

    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error(
        `${a} or ${b} are not the same shape. A: [${a.rows}, ${a.cols}], B: [${
          b.rows
        }, ${b.cols}]`
      );
    }

    const c = new Matrix(a.rows, a.cols);
    const aMatrix = a.data;
    const bMatrix = b.data;

    c.map((value, i, j) => {
      return aMatrix[i][j] + bMatrix[i][j];
    });

    return c;
  }

  static subtract(a, b) {
    if (!a instanceof Matrix || !b instanceof Matrix) {
      throw new Error(`${a} or ${b} are not instances of Matrix`);
    }

    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error(
        `${a} or ${b} are not the same shape. A: [${a.rows}, ${a.cols}], B: [${
          b.rows
        }, ${b.cols}]`
      );
    }

    const c = new Matrix(a.rows, a.cols);
    const aMatrix = a.data;
    const bMatrix = b.data;

    c.map((value, i, j) => {
      return aMatrix[i][j] - bMatrix[i][j];
    });

    return c;
  }

  static divide(a, b) {
    if (!a instanceof Matrix || !b instanceof Matrix) {
      throw new Error(`${a} or ${b} are not instances of Matrix`);
    }

    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error(
        `${a} or ${b} are not the same shape. A: [${a.rows}, ${a.cols}], B: [${
          b.rows
        }, ${b.cols}]`
      );
    }

    const c = new Matrix(a.rows, a.cols);
    const aMatrix = a.data;
    const bMatrix = b.data;

    c.map((value, i, j) => {
      return aMatrix[i][j] / bMatrix[i][j];
    });

    return c;
  }

  static multiply(a, b) {
    if (!a instanceof Matrix || !b instanceof Matrix) {
      throw new Error(`${a} or ${b} are not instances of Matrix`);
    }

    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error(
        `${a} or ${b} are not the same shape. A: [${a.rows}, ${a.cols}], B: [${
          b.rows
        }, ${b.cols}]`
      );
    }

    const c = new Matrix(a.rows, a.cols);
    const aMatrix = a.data;
    const bMatrix = b.data;

    c.map((value, i, j) => {
      return aMatrix[i][j] * bMatrix[j][i];
    });

    return c;
  }

  static dot(a, b) {
    if (!a instanceof Matrix || !b instanceof Matrix) {
      throw new Error(`${a} or ${b} are not instances of Matrix`);
    }

    if (a.cols !== b.rows) {
      throw new Error(
        `${a} cols is not equal to ${b} cols. A: [${a.rows}, ${a.cols}], B: [${
          b.rows
        }, ${b.cols}]`
      );
    }

    const c = new Matrix(a.rows, b.cols);
    const A = a.data;
    const B = b.data;

    c.map((value, i, j) => {
      return A[i].reduce(
        (acc, cur, k) => {
          acc.sum += cur * acc.b[k][acc.j];

          return acc;
        },
        {
          b: B,
          sum: 0,
          j
        }
      ).sum;
    });

    return c;
  }

  static fromArray(arr) {
    const matrix = new Matrix(1, arr.length);
    matrix.map((a, b, c) => arr[c]);
    return matrix;
  }

  randomize() {
    this.map(Math.random);
  }

  add(n) {
    if (isNaN(n)) {
      throw new Error(`${n} is not a number`);
    }
    this.data = this.data.map(col => {
      return col.map(cell => cell + n);
    });
  }

  subtract(n) {
    if (isNaN(n)) {
      throw new Error(`${n} is not a number`);
    }
    this.data = this.data.map(col => {
      return col.map(cell => cell - n);
    });
  }

  divide(n) {
    if (isNaN(n)) {
      throw new Error(`${n} is not a number`);
    }
    this.data = this.data.map(col => {
      return col.map(cell => cell / n);
    });
  }

  multiply(n) {
    if (isNaN(n)) {
      throw new Error(`${n} is not a number`);
    }
    this.data = this.data.map(col => {
      return col.map(cell => cell * n);
    });
  }

  map(fn) {
    if (!isFunction(fn)) {
      throw new Error(`${fn} is not a function`);
    }
    let sum = 0;
    this.data = this.data.map((row, i) => {
      return row.map((col, j) => {
        sum++;
        return fn(col, i, j, sum - 1);
      });
    });
  }

  transpose() {
    this.data = this.data.reduce(
      (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
      []
    );
  }
}

module.exports = Matrix;
