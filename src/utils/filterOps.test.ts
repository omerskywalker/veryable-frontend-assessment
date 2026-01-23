import { filterOpsByQuery } from "./filterOps";
import type { Op } from "@/types";

function makeOp(overrides: Partial<Op> = {}): Op {
  const base: Op = {
    opId: 1,
    publicId: "25-956",
    opTitle: "Production Operator PM Shift",
    operatorsNeeded: 5,
    startTime: "2026-01-19T15:00:00Z",
    endTime: "2026-01-19T23:30:00Z",
    estTotalHours: 8.5,
    operators: [],
    ...overrides,
  };

  return base;
}

describe("filterOpsByQuery", () => {
  test("returns all ops when query is blank", () => {
    const ops = [makeOp({ opId: 1 }), makeOp({ opId: 2 })];
    expect(filterOpsByQuery(ops, "   ")).toEqual(ops);
  });

  test("matches by op title", () => {
    const ops = [
      makeOp({ opId: 1, opTitle: "Forklift Shift" }),
      makeOp({ opId: 2, opTitle: "Warehouse PM" }),
    ];

    const result = filterOpsByQuery(ops, "fork");
    expect(result.map((o) => o.opId)).toEqual([1]);
  });

  test("matches by publicId", () => {
    const ops = [
      makeOp({ opId: 1, publicId: "AA-111" }),
      makeOp({ opId: 2, publicId: "BB-222" }),
    ];

    const result = filterOpsByQuery(ops, "bb-2");
    expect(result.map((o) => o.opId)).toEqual([2]);
  });

  test("matches by operator full name and filters operators when op itself doesn't match", () => {
    const ops: Op[] = [
      makeOp({
        opId: 1,
        opTitle: "Some Shift",
        publicId: "X-1",
        operators: [
          {
            id: 10,
            firstName: "Chris",
            lastName: "Hunter",
            opsCompleted: 100,
            reliability: 0.9,
            endorsements: ["Fast"],
          },
          {
            id: 11,
            firstName: "Torre",
            lastName: "Soto",
            opsCompleted: 20,
            reliability: 0.4,
            endorsements: [],
          },
        ],
      }),
    ];

    // query matches only "chris hunter", not op title/publicId
    const result = filterOpsByQuery(ops, "hunter");

  expect(result).toHaveLength(1);
  // when only operators match, filterOps returns a filteredOperators field
  expect(result[0].filteredOperators).toHaveLength(1);
  expect(result[0].filteredOperators![0].id).toBe(10);
  });

  test("if op matches, keeps all operators", () => {
    const ops: Op[] = [
      makeOp({
        opId: 1,
        opTitle: "Forklift Shift",
        operators: [
          {
            id: 10,
            firstName: "Chris",
            lastName: "Hunter",
            opsCompleted: 100,
            reliability: 0.9,
            endorsements: ["Fast"],
          },
        ],
      }),
    ];

    const result = filterOpsByQuery(ops, "forklift");
  expect(result).toHaveLength(1);
  // when op matches, all operators are preserved on the operators field
  expect(result[0].operators).toHaveLength(1);
  });
});
