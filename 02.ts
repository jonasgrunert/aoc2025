import Solution from "./solution.ts";

const solve = (r: RegExp) => (arr: [number, number][]) =>
  arr.reduce((p, c) => {
    let acc = p;
    for (let l = c[0]; l <= c[1]; l++) {
      if (r.test(l.toString())) acc += l;
    }
    return acc;
  }, 0);

const task = new Solution(
  solve(/^(\d+)\1$/),
  solve(/^(\d+)\1+$/),
  {
    sep: ",",
    transform: (s) =>
      s.split("-").map((n) => Number.parseInt(n)) as [number, number],
  },
);
task.expect(1227775554, 4174379265);

export default task;
