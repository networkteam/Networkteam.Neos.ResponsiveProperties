import { IOptions, ISelectBoxOption, IValue } from "./types";
export declare const shouldDisplaySearchBox: (options: IOptions, processedSelectBoxOptions: ISelectBoxOption[]) => boolean;
export declare const searchOptions: (searchTerm: string, processedSelectBoxOptions: ISelectBoxOption[]) => ISelectBoxOption[];
export declare const processSelectBoxOptions: (i18nRegistry: any, selectBoxOptions: {
    [key: string]: IValue;
}) => ISelectBoxOption[];
