import Solution from "./solution.ts";

const solve = (length: number) => (arr: number[][]) =>
  arr.reduce((p, c) => p + combine(c, length), 0);

function combine(arr: number[], length: number): number {
  const digits = arr.reduce((p, c, i, a) => {
    for (let x = Math.max(0, length + i - a.length); x < length; x++) {
      if (c > p[x]) {
        return [...p.slice(0, x), c, ...new Array(length - x - 1).fill(0)];
      }
    }
    return p;
  }, new Array(length).fill(0));
  return digits.reduce(
    (p, c, i) => p + c * 10 ** (digits.length - 1 - i),
    0,
  );
}

const task = new Solution(
  solve(2),
  solve(12),
  {
    sep: "\n",
    transform: (s) => s.split("").map((n) => Number.parseInt(n)),
  },
);
task.expect(357, 3121910778619);

export default task;
