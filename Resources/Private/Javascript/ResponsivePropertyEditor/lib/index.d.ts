import { FC } from "react";
import { IOptions } from "./types";
interface IEditorProps {
    neos: unknown;
    nodeTypesRegistry: unknown;
    validatorRegistry: unknown;
    editorRegistry: unknown;
    className: unknown;
    i18nRegistry: any;
    id: string;
    label: string;
    editor: string;
    options: IOptions;
    helpMessage: string;
    helpThumbnail: string;
    highlight: boolean;
    identifier: string;
    value: any;
    commit: (value: any) => void;
    dispatch: () => [];
    hooks: null | any;
}
declare const Editor: FC<IEditorProps>;
export default Editor;
