import type { Op } from "@/types";

export type FilteredOp = Op & {
  filteredOperators?: Op["operators"];
};

const normalize = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const matches = (fields: string[], q: string) => {
  const needle = normalize(q);
  if (!needle) return true;
  return fields.some((f) => normalize(f).includes(needle));
};

export function filterOpsByQuery(ops: Op[], query: string): FilteredOp[] {
  const needle = query.trim();
  if (!needle) return ops;

  return ops
    .map((op) => {
      const opMatches = matches([op.opTitle, op.publicId], needle);

      const filteredOperators = op.operators.filter((operator) => {
        const fullName = `${operator.firstName} ${operator.lastName}`;
        const reverseName = `${operator.lastName} ${operator.firstName}`;

        return matches(
          [operator.firstName, operator.lastName, fullName, reverseName],
          needle,
        );
      });

      // if op matches directly, show full operator list
      if (opMatches) return { ...op, filteredOperators: op.operators };

      // if only operators match, show the filtered subset (but keep op.operators intact!)
      if (filteredOperators.length > 0) return { ...op, filteredOperators };

      return null;
    })
    .filter(Boolean) as FilteredOp[];
}
