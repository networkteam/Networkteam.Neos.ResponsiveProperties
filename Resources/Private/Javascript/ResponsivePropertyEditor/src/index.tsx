import React, { FC } from "react";
import SimpleSelectBoxEditor from "./SimpleSelectBoxEditor";
import { IOptions } from "./types";
import { Label, Icon } from "@neos-project/react-ui-components";

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

const Editor: FC<IEditorProps> = (props) => {
  const { value: currentValues } = props;

  const handleValueChange =
    (propertyName: string) =>
    (value: any): void => {
      const newProperties = {
        ...currentValues,
        [propertyName]: value,
      };

      props.commit(newProperties);
    };

  return (
    <>
      {Object.keys(props.options.properties).map((propertyName) => {
        // TODO: Label needs translation
        const { label, icon } = props.options.properties[propertyName];
        return (
          <div key={"select-box-" + propertyName}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {icon && <Icon icon={icon} style={{ marginRight: 10 }} />}
              <Label style={{ width: "100%" }}>{label}</Label>
            </div>
            <SimpleSelectBoxEditor
              value={currentValues[propertyName]}
              commit={handleValueChange(propertyName)}
              options={props.options}
              i18nRegistry={props.i18nRegistry}
            />
          </div>
        );
      })}
    </>
  );
};

export default Editor;
