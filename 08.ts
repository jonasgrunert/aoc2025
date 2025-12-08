import Solution from "./solution.ts";

type Distance = {
  dis: number;
  a: number;
  b: number;
};

const distance = (a: number[], b: number[]) =>
  a.reduce((p, c, i) => (c - b[i]) ** 2 + p, 0);

const task = new Solution(
  (arr: [number, number, number][]) => {
    const distances = arr.flatMap((a, i, l) =>
      l.slice(i + 1).map((b, j) => ({
        dis: distance(a, b),
        a: i,
        b: j + i + 1,
      }))
    ).sort((a, b) => a.dis - b.dis);
    const circuits: Set<Set<number>> = new Set(arr.map((_, i) => new Set([i])));
    for (let i = 0; i < (isTest ? 10 : 1000); i++) {
      const shortest = distances.shift()!;
      const newConn = circuits.values().filter((c) =>
        c.has(shortest.a) || c.has(shortest.b)
      ).toArray();
      if (newConn.length === 1) {
        newConn[0].add(shortest.a).add(shortest.b);
      }
      if (newConn.length > 1) {
        circuits.add(newConn.reduce((p, c) => {
          circuits.delete(c);
          return p.union(c);
        }));
      }
    }
    return circuits.values().toArray().sort((a, b) => b.size - a.size).slice(
      0,
      3,
    ).reduce(
      (p, c) => p * c.size,
      1,
    );
  },
  (arr: [number, number, number][]) => {
    const distances = arr.flatMap((a, i, l) =>
      l.slice(i + 1).map((b, j) => ({
        dis: distance(a, b),
        a: i,
        b: j + i + 1,
      }))
    ).sort((a, b) => a.dis - b.dis);
    const circuits: Set<Set<number>> = new Set(arr.map((_, i) => new Set([i])));
    let shortest: Distance;
    while (circuits.size !== 1) {
      shortest = distances.shift()!;
      const newConn = circuits.values().filter((c) =>
        c.has(shortest.a) || c.has(shortest.b)
      ).toArray();
      if (newConn.length === 1) {
        newConn[0].add(shortest.a).add(shortest.b);
      }
      if (newConn.length > 1) {
        circuits.add(newConn.reduce((p, c) => {
          circuits.delete(c);
          return p.union(c);
        }, new Set<number>()));
      }
    }
    return arr[shortest!.a][0] * arr[shortest!.b][0];
  },
  {
    sep: "\n",
    transform: (s) =>
      s.split(",").map((n) => Number.parseInt(n)) as [number, number, number],
  },
);
task.expect(40, 25272);

export default task;
