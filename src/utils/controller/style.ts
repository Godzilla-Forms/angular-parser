import {GodzillaFormControls} from "@godzilla-forms/core";

export function controlCssClass(control: GodzillaFormControls, enableGridSystem: boolean = true): string {
  if (!control.style) return "mb-3";
  const cssClassToAdd: string[] = ["mb-3"];
  for (const [key, value] of Object.entries(control.style)) {
    if (!value) continue;
    switch (key) {
      case "col":
        if (enableGridSystem)
          cssClassToAdd.push(`col-${value}`);
        break
      case "colXs":
        if (enableGridSystem)
          cssClassToAdd.push(`col-xs-${value}`);
        break
      case "colSm":
        if (enableGridSystem)
          cssClassToAdd.push(`col-sm-${value}`);
        break
      case "colMd":
        if (enableGridSystem)
          cssClassToAdd.push(`col-md-${value}`);
        break
      case "colXl":
        if (enableGridSystem)
          cssClassToAdd.push(`col-xl-${value}`);
        break
      case "colLg":
        if (enableGridSystem)
          cssClassToAdd.push(`col-lg-${value}`);
        break
      case "colXxl":
        if (enableGridSystem)
          cssClassToAdd.push(`col-xxl-${value}`);
        break
      case "customCss":
        cssClassToAdd.push(value);
        break
    }
  }
  return cssClassToAdd.join(" ");
}
