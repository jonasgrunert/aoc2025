import Solution from "./solution.ts";

const mod = (n: number, d: number) => ((n % d) + d) % d;

const task = new Solution(
  (arr: ["L" | "R", number][]) =>
    arr.reduce((p, c) => {
      const n = p.curr + (c[0] === "L" ? -c[1] : c[1]);
      p.curr = mod(n, 100);
      if (p.curr === 0) p.count++;
      return p;
    }, { count: 0, curr: 50 }).count,
  (arr: ["L" | "R", number][]) =>
    arr.reduce((p, c) => {
      const s = p.curr;
      const n = p.curr + (c[0] === "L" ? -c[1] : c[1]);
      p.curr = mod(n, 100);
      p.count += Math.floor(Math.abs(n) / 100);
      if (n <= 0 && s !== 0) p.count++;
      return p;
    }, { count: 0, curr: 50 }).count,
  {
    sep: "\n",
    transform: (s) =>
      [s[0], Number.parseInt(s.slice(1))] as ["L" | "R", number],
  },
);
task.expect(3, 6);

export default task;
