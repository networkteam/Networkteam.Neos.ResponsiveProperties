import { IOptions, ISelectBoxOption, IValue } from "./types";

export const shouldDisplaySearchBox = (options: IOptions, processedSelectBoxOptions: ISelectBoxOption[]): boolean =>
  typeof options.minimumResultsForSearch !== "undefined" &&
  options.minimumResultsForSearch >= 0 &&
  processedSelectBoxOptions.length >= options.minimumResultsForSearch;

// Currently, we're doing an extremely simple lowercase substring matching; of course this could be improved a lot!
export const searchOptions = (searchTerm: string, processedSelectBoxOptions: ISelectBoxOption[]): ISelectBoxOption[] =>
  processedSelectBoxOptions.filter(
    (option) => option.label && option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

export const processSelectBoxOptions = (
  i18nRegistry: any,
  selectBoxOptions: { [key: string]: IValue }
): ISelectBoxOption[] =>
  Object.keys(selectBoxOptions).reduce<ISelectBoxOption[]>((options, currentOptionKey) => {
    const currentOption = selectBoxOptions[currentOptionKey];
    if (!currentOption || !currentOption.label) {
      return options;
    }
    return [
      ...options,
      {
        value: currentOptionKey,
        ...currentOption,
        label: i18nRegistry.translate(currentOption.label),
      },
    ];
  }, []);
