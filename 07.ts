import Solution from "./solution.ts";

const solve = (task: 1 | 2) => (arr: string[][]) => {
  let start = -1;
  const obstacles = arr.reduce((p, c, y) => {
    c.forEach((s, x) => {
      if (s === "^") {
        p.set(x, [...p.get(x) ?? [], y]);
      }
      if (s === "S") start = x;
    });
    return p;
  }, new Map<number, number[]>());
  const descend = (
    [x, y]: [number, number],
    visited: Map<string, number>,
  ): number => {
    const id = [x, y].join(",");
    const known = visited.get(id);
    if (known !== undefined) return task === 1 ? 0 : known;
    const count = [-1, 1].reduce((p, c) => {
      const newSplitter = obstacles.get(x + c)?.find((h) => h > y);
      if (newSplitter) {
        return p + descend([x + c, newSplitter], visited);
      }
      return p + (task === 1 ? 0 : 1);
    }, task === 1 ? 1 : 0);
    visited.set(id, count);
    return count;
  };
  return descend(
    [start, obstacles.get(start)![0]],
    new Map<string, number>(),
  );
};

const task = new Solution(
  solve(1),
  solve(2),
  {
    sep: "\n",
    transform: (s) => s.split(""),
  },
);
task.expect(21, 40);

export default task;
