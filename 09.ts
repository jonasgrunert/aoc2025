import Solution from "./solution.ts";

type Point = [number, number];

type Path = { x: number; y: number; dx: number } | {
  y: number;
  x: number;
  dy: number;
};

const area = (a: Point, b: Point) =>
  (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);

const sortTuples = (tuples: [Point, Point]) =>
  tuples.sort((a, b) => a.reduce((p, c, i) => p || c - b[i], 0));

const task = new Solution(
  (arr: Point[]) => {
    let maxArea = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        maxArea = Math.max(maxArea, area(arr[i], arr[j]));
      }
    }
    return maxArea;
  },
  // big help from https://github.com/mgtezak/Advent_of_Code/blob/master/2025/09/p2.py
  (arr: Point[]) => {
    let maxArea = 0;
    const edges = arr.map((c, i) => sortTuples([c, arr[i + 1] ?? arr[0]]))
      .toSorted((a, b) => area(...b) - area(...a));
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const currArea = area(arr[i], arr[j]);
        if (currArea > maxArea) {
          const x1 = Math.min(arr[i][0], arr[j][0]);
          const x2 = Math.max(arr[i][0], arr[j][0]);
          const y1 = Math.min(arr[i][1], arr[j][1]);
          const y2 = Math.max(arr[i][1], arr[j][1]);
          if (
            !edges.some(([[x3, y3], [x4, y4]]) =>
              x4 > x1 && x3 < x2 && y4 > y1 && y3 < y2
            )
          ) {
            maxArea = currArea;
          }
        }
      }
    }
    return maxArea;
  },
  {
    sep: "\n",
    transform: (s) => s.split(",").map((n) => Number.parseInt(n)) as Point,
  },
);
task.expect(50, 24);

export default task;
