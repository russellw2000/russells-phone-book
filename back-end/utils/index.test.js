const { generateToken } = require("./index");

test("Must be string of length 20", () => {
  expect(generateToken()).toHaveLength(20);
});
