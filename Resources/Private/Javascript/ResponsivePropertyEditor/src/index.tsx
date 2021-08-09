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
  const { value: currentValues, i18nRegistry: i18n } = props;

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
        const { label, icon, values } = props.options.properties[propertyName];
        const selectOptions: IOptions = {
          ...props.options,
          values: values && Object.keys(values).length ? values : props.options.values,
        };
        return (
          <div key={"select-box-" + propertyName}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {icon && <Icon icon={icon} style={{ marginRight: 10 }} />}
              <Label style={{ width: "100%" }}>{i18n.translate(label)}</Label>
            </div>
            <SimpleSelectBoxEditor
              value={currentValues[propertyName]}
              commit={handleValueChange(propertyName)}
              options={selectOptions}
              i18nRegistry={i18n}
            />
          </div>
        );
      })}
    </>
  );
};

export default Editor;
