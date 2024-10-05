export type objectAPIState = {
  data: any;
  pending: boolean;
  error: boolean;
};

export const objectAPIInitialState: objectAPIState = {
  data: {},
  pending: false,
  error: false,
};
export type objectArrayAPIState = {
  data: any[];
  oneObject: any;
  pending: boolean;
  length: number;
  error: boolean;
};

export const objectArrayAPIInitialState: objectArrayAPIState = {
  data: [],
  oneObject: {},
  length: 0,
  pending: false,
  error: false,
};
