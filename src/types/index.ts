export type ID = string | number;

export interface Operator {
  id: ID;
  firstName: string;
  lastName: string;
  opsCompleted: number;
  reliability: number;
  endorsements: string[];
}

export interface Op {
  opId: ID;
  publicId: string;
  opTitle: string;
  operatorsNeeded: number;
  startTime: string;
  endTime: string;
  estTotalHours: number;
  operators: Operator[];
}
