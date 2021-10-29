export enum ActionType {
  SizeChange = 'SIZE_CHANGE',
  ValueChange = 'VALUE_CHANGE',
}

export type Action =
  | { type: ActionType.SizeChange; payload: number }
  | { type: ActionType.ValueChange; payload: number[] };

export type State = {
  value: number[];
  size: number;
};

export type Animation = {
  type: string;
  position: number[];
};
