export interface IValue {
    label: string;
    icon: string;
    group: string;
}
export interface IValues {
    [key: string]: IValue;
}
export interface IProperty {
    label: string;
    icon: string;
    values: IValues;
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
    values: IValues;
}
export interface ISelectBoxOption extends IValue {
    value: string;
}
