import type { Declaration, Root, Rule } from "postcss";
import postcss from "postcss";

// /**
//  * 编写一个 PostCSS 插件，实现以下效果：
//     扫描 CSS 中带有 data-theme="dark" 属性的选择器。
//     提取该选择器下的所有样式声明（Declarations）。
//     将这些样式自动转换为 CSS 变量（Custom Properties），并挂载到 :root 下。
//     在原位置插入一段调试注释，并移除原始的 data-theme="dark" 规则。
//  */

export const darkModeGeneratorPlugin = {
  postcssPlugin: "postcss-dark-mode-generator",
  // OnceExit Rule Declaration ...
  Once(root: Root) {
    const declMap = new Map();
    root.walkRules((rule: Rule) => {
      const pureSelector = rule.selector.replaceAll(/\s/g, "");
      // 1.提取属性为dark的rule
      if (
        pureSelector.includes(`[data-theme="dark"]`) ||
        pureSelector.includes(`[data-theme='dark']`)
      ) {
        rule.walkDecls((decl: Declaration) => {
          declMap.set(`--card-${decl.prop}`, decl.value);
        });
      }
      // 2.创建root节点并设置变量
      // const rootNode = postcss.rule({ selector: ":root" });
      // for (const [prop, value] of declMap) {
      //   rootNode.append(postcss.decl({ prop, value }));
      // }
      // postcss.root()是建立了新的文档树
      // rule.root().prepend(rootNode);
      //3.把普通的card类的decl的value替换为变量
      if (pureSelector === ".card") {
        rule.walkDecls((decl: Declaration) => {
          decl.cloneBefore({
            prop: decl.prop,
            value: `var(--card-${decl.prop})`,
          });
          decl.remove();
        });
      }
      // 4.删除.card[data-theme = "dark"]
      if (
        pureSelector.includes(`[data-theme="dark"]`) ||
        pureSelector.includes(`[data-theme='dark']`)
      ) {
        rule.remove();
      }
      console.log("------------------");
    });
    // 2.创建root节点并设置变量
    const rootNode = postcss.rule({ selector: ":root" });
    for (const [prop, value] of declMap) {
      rootNode.append(postcss.decl({ prop, value }));
    }
    root.prepend(
      postcss.comment({
        text: `[Auto-Generated] Extracted  dark mode variables`,
      }),
    );
    // postcss.root()是建立了新的文档树
    root.prepend(rootNode);
  },
};
