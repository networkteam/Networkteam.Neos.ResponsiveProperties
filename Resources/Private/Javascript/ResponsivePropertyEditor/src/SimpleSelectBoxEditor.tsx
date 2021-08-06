import React, { FC, useState } from "react";
import { SelectBox, MultiSelectBox } from "@neos-project/react-ui-components";
import { IOptions } from "./types";
import { processSelectBoxOptions, searchOptions, shouldDisplaySearchBox } from "./SelectBoxHelpers";

export interface ISimpleSelectBoxProps {
  commit(value: any): void;
  value?: any;
  className?: string;
  options: IOptions;
  i18nRegistry: any;
}

const SimpleSelectBox: FC<ISimpleSelectBoxProps> = ({ commit, value, className, options, i18nRegistry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const defaultOptions = { minimumResultsForSearch: 5, threshold: 0, disabled: false };
  const mergedOptions = { ...defaultOptions, ...options };
  const processedSelectBoxOptions = processSelectBoxOptions(i18nRegistry, mergedOptions.values);
  const allowEmpty = options.allowEmpty || Object.prototype.hasOwnProperty.call(options.values, "");
  const placeholder =
    (options && options.placeholder && i18nRegistry.translate(unescape(options.placeholder))) ||
    i18nRegistry.translate("Neos.Neos:Main:choose");

  if (options.multiple) {
    return (
      <MultiSelectBox
        className={className}
        options={processedSelectBoxOptions}
        values={value || []}
        onValuesChange={commit}
        placeholder={placeholder}
        allowEmpty={allowEmpty}
        displaySearchBox={shouldDisplaySearchBox(mergedOptions, processedSelectBoxOptions)}
        searchOptions={searchOptions(searchTerm, processedSelectBoxOptions)}
        onSearchTermChange={setSearchTerm}
        noMatchesFoundLabel={i18nRegistry.translate("Neos.Neos:Main:noMatchesFound")}
        searchBoxLeftToTypeLabel={i18nRegistry.translate("Neos.Neos:Main:searchBoxLeftToType")}
        threshold={mergedOptions.threshold}
        disabled={mergedOptions.disabled}
      />
    );
  }
  return (
    <SelectBox
      options={searchTerm ? searchOptions(searchTerm, processedSelectBoxOptions) : processedSelectBoxOptions}
      value={value}
      className={className}
      onValueChange={commit}
      placeholder={placeholder}
      allowEmpty={allowEmpty}
      displaySearchBox={shouldDisplaySearchBox(mergedOptions, processedSelectBoxOptions)}
      onSearchTermChange={setSearchTerm}
      noMatchesFoundLabel={i18nRegistry.translate("Neos.Neos:Main:noMatchesFound")}
      searchBoxLeftToTypeLabel={i18nRegistry.translate("Neos.Neos:Main:searchBoxLeftToType")}
      threshold={mergedOptions.threshold}
      disabled={mergedOptions.disabled}
    />
  );
};

export default SimpleSelectBox;
