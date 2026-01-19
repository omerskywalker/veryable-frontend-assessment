import type { Op } from "@/types";

const normalize = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const matches = (fields: string[], q: string) => {
  const needle = normalize(q);
  if (!needle) return true;
  return fields.some((f) => normalize(f).includes(needle));
};

export function filterOpsByQuery(ops: Op[], query: string): Op[] {
  if (!query.trim()) return ops;

  return ops
    .map((op) => {
      const opMatches = matches([op.opTitle, op.publicId], query);

      const matchingOperators = op.operators.filter((operator) => {
        const fullName = `${operator.firstName} ${operator.lastName}`;
        const reverseName = `${operator.lastName} ${operator.firstName}`;

        return matches(
          [operator.firstName, operator.lastName, fullName, reverseName],
          query,
        );
      });

      if (opMatches) return op;

      if (matchingOperators.length > 0) {
        return { ...op, operators: matchingOperators };
      }

      return null;
    })
    .filter(Boolean) as Op[];
}
