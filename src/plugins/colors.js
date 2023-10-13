import variables from '@/assets/css/_foundation/_variable-colors.scss';

const regex = {
  brand: /brand-.*?/,
  brandDerived: /brandDerived-.*?/,
  text: /text-.*?/,
  sub: /sub-.*?/
};

let colors = {
  brand: {},
  brandDerived: {},
  text: {},
  sub: {},
  other: {}
};
Object.keys(variables).forEach(variable => {
  if (variable.match(regex.brand)) {
    const color = variable.replace('brand-', '');
    colors.brand[color] = variables[variable];
  } else if (variable.match(regex.brandDerived)) {
    const color = variable.replace('brandDerived-', '');
    colors.brandDerived[color] = variables[variable];
  } else if (variable.match(regex.text)) {
    const color = variable.replace('text-', '');
    colors.text[color] = variables[variable];
  } else if (variable.match(regex.sub)) {
    const color = variable.replace('sub-', '');
    colors.sub[color] = variables[variable];
  } else {
    const color = variable.replace('other-', '');
    colors.other[color] = variables[variable];
  }
});

export default (_, inject) => inject('colors', colors)
