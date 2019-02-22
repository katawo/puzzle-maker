import { pickRandomDirection, getAvailableArea } from "../random-pick";

describe("random picker", () => {
  test("should random direction", () => {
    const expectedValues = [-1, 0, 1];
    const direction = pickRandomDirection();
    console.log({ direction });

    expect(expectedValues).toContain(direction.x);
    expect(expectedValues).toContain(direction.y);
  });
});

describe("Get Available Area", () => {
  test("should return { [0, 5], [0, 5] }", () => {
    const direction = { x: 1, y: 1 };
    const size = 10;
    const length = 4;
    const area = getAvailableArea(size, length, direction);
    expect(area).toEqual({ x: [0, 5], y: [0, 5] });
  });

  test("should return { [0, 4], [5, 9] }", () => {
    const direction = { x: 1, y: -1 };
    const size = 10;
    const length = 4;
    const area = getAvailableArea(size, length, direction);
    expect(area).toEqual({ x: [0, 5], y: [4, 9] });
  });
});
