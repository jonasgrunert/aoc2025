import Solution from "./solution.ts";

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const buildGrid = (grid: string[][]) =>
  new Set(
    grid.flatMap((row, y) =>
      row.map((c, x) => c === "@" ? [x, y].join(",") : false)
        .filter(Boolean) as string[]
    ),
  );

const findRemovable = (rolls: Set<string>) => {
  const removable = new Set<string>();
  for (const roll of rolls) {
    const [x, y] = roll.split(",").map((n) => Number.parseInt(n));
    if (
      dirs.filter(([dx, dy]) => rolls.has([x + dx, y + dy].join(",")))
        .length < 4
    ) {
      removable.add(roll);
    }
  }
  return removable;
};

const task = new Solution(
  (grid: string[][]) => findRemovable(buildGrid(grid)).size,
  (grid: string[][]) => {
    let rolls = buildGrid(grid);
    let count = 0;
    let removable = findRemovable(rolls);
    while (removable.size > 0) {
      removable = findRemovable(rolls);
      count += removable.size;
      rolls = rolls.difference(removable);
    }
    return count;
  },
  {
    sep: "\n",
    transform: (s) => s.split(""),
  },
);
task.expect(13, 43);

export default task;
