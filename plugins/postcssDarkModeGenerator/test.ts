// test.ts
import postcss from "postcss";
import { darkModeGeneratorPlugin } from "./postcssDarkModeGenerator.ts";

const inputCSS = `
.card {
  background: #ffffff;
  color: #333333;
  border: 1px solid #eeeeee;
}

.card[data-theme="dark"] {
  background: #121212;
  color: #f5f5f5;
  border: 1px solid #333333;
}
`;

const targetCss = `
/* [Auto-Generated] Extracted 3 dark mode variables */
:root {
  --card-bg: #121212;
  --card-color: #f5f5f5;
  --card-border: 1px solid #333333;
}

.card {
  background: var(--card-bg);
  color: var(--card-color);
  border: var(--card-border);
}
`;

async function runTest() {
  try {
    // 核心测试 API：process
    const result = await postcss([darkModeGeneratorPlugin]).process(inputCSS, {
      from: undefined, // 避免 PostCSS 报缺少源文件路径的警告
    });

    console.log("\n========== 📥 输入 CSS ==========");
    console.log(inputCSS);

    console.log("\n========== 📤 输出 CSS ==========");
    console.log(result.css);

    console.log("\n========== ⚠️ 警告信息 ==========");
    console.log(result.warnings());
  } catch (error) {
    console.error("❌ 插件处理报错:", error);
  }
}

runTest();
