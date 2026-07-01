import type { Rule, Declaration } from "postcss";

export const fontSizeScalePlugin = {
  postcssPlugin: "postcss-font-size-scale",
  Declaration(decl: Declaration) {
    // console.log(decl);
  },
};
