import Solution from "./solution.ts";

const add = (a: number, b: number) => a + b;
const mul = (a: number, b: number) => a * b;

const task = new Solution(
  (arr: string[]) => {
    const trimmed = arr.map((s) => s.trim().split(/\s+/));
    const op = trimmed.pop()!;
    return op.reduce(
      (total, c, i) =>
        total +
        trimmed.map((n) => Number.parseInt(n[i])).reduce(c === "*" ? mul : add),
      0,
    );
  },
  (arr: string[]) => {
    const op = arr.pop()!;
    const r = /(\+|\*) */g;
    let m: null | RegExpExecArray;
    let total = 0;
    while ((m = r.exec(op)) !== null) {
      let v = m[1] === "*" ? 1 : 0;
      for (
        let i = m.index;
        i < (r.lastIndex === op.length ? op.length : r.lastIndex - 1);
        i++
      ) {
        const s = arr.map((n) => n[i]).join("").trim();
        const n = Number.parseInt(s);
        v = m[1] === "*" ? mul(v, n) : add(v, n);
      }
      total += v;
    }
    return total;
  },
  {
    sep: "\n",
  },
);
task.expect(4277556, 3263827);

export default task;
