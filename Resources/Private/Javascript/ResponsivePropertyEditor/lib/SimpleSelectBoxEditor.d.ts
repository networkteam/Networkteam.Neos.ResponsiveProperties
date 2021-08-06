import { FC } from "react";
import { IOptions } from "./types";
export interface ISimpleSelectBoxProps {
    commit(value: any): void;
    value?: any;
    className?: string;
    options: IOptions;
    i18nRegistry: any;
}
declare const SimpleSelectBox: FC<ISimpleSelectBoxProps>;
export default SimpleSelectBox;
