import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

// 获取当前文件目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 自动生成侧边栏
function generateSidebar(dir: string): any[] {
  // 使用绝对路径
  const basePath = path.resolve(__dirname, "..", dir);

  try {
    if (!fs.existsSync(basePath)) return [];

    const files = fs.readdirSync(basePath, { withFileTypes: true });
    const result: any[] = [];

    for (const file of files) {
      const fileName = file.name;

      if (file.isDirectory()) {
        // 递归处理子目录
        const children = generateSidebar(path.join(dir, fileName));
        if (children.length > 0) {
          result.push({
            text: fileName,
            collapsed: false,
            items: children,
          });
        }
      } else if (fileName.endsWith(".md")) {
        // 处理 Markdown 文件
        const title = fileName.replace(/\.md$/, "");
        // URL 编码确保空格和特殊字符正确处理
        const encodedTitle = encodeURIComponent(title);
        const linkPath = `/${dir}/${encodedTitle}`.replace(/\\/g, "/");

        result.push({
          text: title,
          link: linkPath,
        });
      }
    }

    return result;
  } catch (error) {
    console.error("生成侧边栏错误:", error);
    return [];
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的知识库",
  description: "基于 VitePress 构建的个人知识库",
  ignoreDeadLinks: true,
  lang: "zh-CN",
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          [
            "center",
            "details",
            "summary",
            "u",
            "kbd",
            "sup",
            "sub",
            "big",
            "small",
            "font",
            "tt",
            "hr",
            "br",
          ].includes(tag),
      },
    },
  },
  markdown: {
    // 开启图片懒加载、相对路径处理等
    image: {
      lazyLoading: true,
    },

    // 开启所有常用扩展（表格、脚注、上标、下标、任务列表等）
    config: (md) => {
      md.set({ html: true, breaks: true, linkify: true });
      // 可选：如果你还想加更多插件，直接在这里 require 就行
      // const plugin = require('markdown-it-xxx')
      // md.use(plugin)
    },

    // 代码块主题（任选其一）
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
  lastUpdated: true, // 显示最后更新时间
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "首页", link: "/" }],

    sidebar: {
      "/notes/": generateSidebar("notes"),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    footer: {
      message: "基于 MIT 许可发布。",
      copyright: "版权所有 © 2025",
    },
  },
});
