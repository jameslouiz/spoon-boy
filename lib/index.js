"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var buildMatrix = function buildMatrix() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var fill = arguments.length > 2 ? arguments[2] : undefined;
  return Array(rows).fill(Array(cols).fill(fill));
};

var isFunction = function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
};

var _randomize = function randomize() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return Array(rows).fill(Array.from({
    length: cols
  }, Math.random));
};

var Matrix =
/*#__PURE__*/
function () {
  function Matrix() {
    var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
    var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Matrix);

    this.cols = cols;
    this.rows = rows;
    this.data = buildMatrix(rows, cols, fill);
    this.size = cols * rows;
  }

  _createClass(Matrix, [{
    key: "randomize",
    value: function randomize() {
      this.data = _randomize(this.rows, this.cols);
    }
  }, {
    key: "add",
    value: function add(n) {
      if (isNaN(n)) {
        throw new Error("".concat(n, " is not a number"));
      }

      this.data = this.data.map(function (col) {
        return col.map(function (cell) {
          return cell + n;
        });
      });
    }
  }, {
    key: "subtract",
    value: function subtract(n) {
      if (isNaN(n)) {
        throw new Error("".concat(n, " is not a number"));
      }

      this.data = this.data.map(function (col) {
        return col.map(function (cell) {
          return cell - n;
        });
      });
    }
  }, {
    key: "divide",
    value: function divide(n) {
      if (isNaN(n)) {
        throw new Error("".concat(n, " is not a number"));
      }

      this.data = this.data.map(function (col) {
        return col.map(function (cell) {
          return cell / n;
        });
      });
    }
  }, {
    key: "multiply",
    value: function multiply(n) {
      if (isNaN(n)) {
        throw new Error("".concat(n, " is not a number"));
      }

      this.data = this.data.map(function (col) {
        return col.map(function (cell) {
          return cell * n;
        });
      });
    }
  }, {
    key: "map",
    value: function map(fn) {
      if (!isFunction(fn)) {
        throw new Error("".concat(fn, " is not a function"));
      }

      var sum = 0;
      this.data = this.data.map(function (row, i) {
        return row.map(function (col, j) {
          sum++;
          return fn(col, i, j, sum - 1);
        });
      });
    }
  }, {
    key: "transpose",
    value: function transpose() {
      this.data = this.data.reduce(function (prev, next) {
        return next.map(function (item, i) {
          return (prev[i] || []).concat(next[i]);
        });
      }, []);
    }
  }], [{
    key: "add",
    value: function add(a, b) {
      if (!a instanceof Matrix || !b instanceof Matrix) {
        throw new Error("".concat(a, " or ").concat(b, " are not instances of Matrix"));
      }

      if (a.cols !== b.cols || a.rows !== b.rows) {
        throw new Error("".concat(a, " or ").concat(b, " are not the same shape. A: [").concat(a.rows, ", ").concat(a.cols, "], B: [").concat(b.rows, ", ").concat(b.cols, "]"));
      }

      var c = new Matrix(a.rows, a.cols);
      var aMatrix = a.data;
      var bMatrix = b.data;
      c.map(function (value, i, j) {
        return aMatrix[i][j] + bMatrix[i][j];
      });
      return c;
    }
  }, {
    key: "subtract",
    value: function subtract(a, b) {
      if (!a instanceof Matrix || !b instanceof Matrix) {
        throw new Error("".concat(a, " or ").concat(b, " are not instances of Matrix"));
      }

      if (a.cols !== b.cols || a.rows !== b.rows) {
        throw new Error("".concat(a, " or ").concat(b, " are not the same shape. A: [").concat(a.rows, ", ").concat(a.cols, "], B: [").concat(b.rows, ", ").concat(b.cols, "]"));
      }

      var c = new Matrix(a.rows, a.cols);
      var aMatrix = a.data;
      var bMatrix = b.data;
      c.map(function (value, i, j) {
        return aMatrix[i][j] - bMatrix[i][j];
      });
      return c;
    }
  }, {
    key: "divide",
    value: function divide(a, b) {
      if (!a instanceof Matrix || !b instanceof Matrix) {
        throw new Error("".concat(a, " or ").concat(b, " are not instances of Matrix"));
      }

      if (a.cols !== b.cols || a.rows !== b.rows) {
        throw new Error("".concat(a, " or ").concat(b, " are not the same shape. A: [").concat(a.rows, ", ").concat(a.cols, "], B: [").concat(b.rows, ", ").concat(b.cols, "]"));
      }

      var c = new Matrix(a.rows, a.cols);
      var aMatrix = a.data;
      var bMatrix = b.data;
      c.map(function (value, i, j) {
        return aMatrix[i][j] / bMatrix[i][j];
      });
      return c;
    }
  }, {
    key: "multiply",
    value: function multiply(a, b) {
      if (!a instanceof Matrix || !b instanceof Matrix) {
        throw new Error("".concat(a, " or ").concat(b, " are not instances of Matrix"));
      }

      if (a.cols !== b.cols || a.rows !== b.rows) {
        throw new Error("".concat(a, " or ").concat(b, " are not the same shape. A: [").concat(a.rows, ", ").concat(a.cols, "], B: [").concat(b.rows, ", ").concat(b.cols, "]"));
      }

      var c = new Matrix(a.rows, a.cols);
      var aMatrix = a.data;
      var bMatrix = b.data;
      c.map(function (value, i, j) {
        return aMatrix[i][j] * bMatrix[i][j];
      });
      return c;
    }
  }, {
    key: "dot",
    value: function dot(a, b) {
      if (!a instanceof Matrix || !b instanceof Matrix) {
        throw new Error("".concat(a, " or ").concat(b, " are not instances of Matrix"));
      }

      if (a.cols !== b.rows) {
        throw new Error("".concat(a, " cols is not equal to ").concat(b, " cols. A: [").concat(a.rows, ", ").concat(a.cols, "], B: [").concat(b.rows, ", ").concat(b.cols, "]"));
      }

      var c = new Matrix(a.rows, b.cols);
      var A = a.data;
      var B = b.data;
      c.map(function (value, i, j) {
        return A[i].reduce(function (acc, cur, k) {
          acc.sum += cur * acc.b[k][acc.j];
          return acc;
        }, {
          b: B,
          sum: 0,
          j: j
        }).sum;
      });
      return c;
    }
  }]);

  return Matrix;
}();

var _default = Matrix;
exports["default"] = _default;