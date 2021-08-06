export interface IValue {
  label: string;
  icon: string;
  group: string;
}

export interface IProperty {
  label: string;
  icon: string;
}

export interface IOptions {
  allowEmpty?: boolean;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  minimumResultsForSearch?: number;
  threshold?: number;
  properties: {
    [key: string]: IProperty;
  };
  values: {
    [key: string]: IValue;
  };
}

export interface ISelectBoxOption extends IValue {
  value: string;
}
