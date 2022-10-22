import { GodzillaFormControls, GodzillaItemTypes } from '@godzilla-forms/core';

export declare type LabelPositionType = 'top' | 'bottom' | 'none';

export function controlCssClass(
  control: GodzillaFormControls,
  enableGridSystem: boolean = true,
): string {
  if (!control.style) return 'mb-3';
  const cssClassToAdd: string[] = ['mb-3'];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(control.style)) {
    // eslint-disable-next-line no-continue
    if (!value) continue;
    switch (key) {
      case 'col':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-${value}`);
        }
        break;
      case 'colXs':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-xs-${value}`);
        }
        break;
      case 'colSm':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-sm-${value}`);
        }
        break;
      case 'colMd':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-md-${value}`);
        }
        break;
      case 'colXl':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-xl-${value}`);
        }
        break;
      case 'colLg':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-lg-${value}`);
        }
        break;
      case 'colXxl':
        if (enableGridSystem) {
          cssClassToAdd.push(`col-xxl-${value}`);
        }
        break;
      case 'customCss':
        cssClassToAdd.push(value);
        break;
      case 'floating':
        cssClassToAdd.push('form-floating');
        break;
      default:
        break;
    }
  }
  return cssClassToAdd.join(' ');
}

export function labelPosition(item: GodzillaFormControls): LabelPositionType {
  switch (true) {
    case item.style?.floating === true:
    case item.type === GodzillaItemTypes.checkbox:
      return 'bottom';
    case item.style?.floating === false:
      return 'top';
    case item.type === GodzillaItemTypes.heading:
      return 'none';
    default:
      return 'top';
  }
}
