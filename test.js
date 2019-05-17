import Matrix from "./index";

describe("Matrix Class", () => {
  it("Should create and instance of the matrix class", () => {
    const matrix = new Matrix();

    expect(matrix instanceof Matrix);
  });
});
