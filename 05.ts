import Solution from "./solution.ts";

const numberInRange = (num: number, range: [number, number]) => {
  return num >= range[0] && num <= range[1];
};
const task = new Solution(
  (db: string[][]) => {
    const [ranges, ids] = db;
    const numRanges = ranges.map((range) =>
      range.split("-").map((n) => Number.parseInt(n)) as [number, number]
    );
    return ids.filter((id) =>
      numRanges.some((r) => numberInRange(Number.parseInt(id), r))
    ).length;
  },
  ([ranges]: string[][]) => {
    const numRanges = ranges.map((c) =>
      c.split("-").map((n) => Number.parseInt(n)) as [number, number]
    ).toSorted((a, b) => a[0] - b[0]);
    return numRanges.reduce((p, [min, max]) => {
      const total = p.total +
        (min > p.currEnd ? max - min + 1 : Math.max(0, max - p.currEnd));
      return { total, currEnd: Math.max(p.currEnd, max) };
    }, { total: 0, currEnd: -Infinity }).total;
  },
  {
    sep: "\n\n",
    transform: (s) => s.split("\n"),
  },
);
task.expect(3, 14);

export default task;
