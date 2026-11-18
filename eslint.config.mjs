import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const fsdBoundaries = [
  {
    files: ["src/_pages/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*"],
              message: "Pages не может импортировать App.",
            },
            {
              group: ["@pages/*"],
              message:
                "Межслайсовые импорты Pages запрещены, используй относительные пути.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*"],
              message:
                "Widgets может импортировать только features, entities, shared.",
            },
            {
              group: ["@widgets/*"],
              message: "Межслайсовые импорты Widgets запрещены.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*", "@widgets/*"],
              message:
                "Features может импортировать только entities и shared.",
            },
            {
              group: ["@features/*"],
              message: "Межслайсовые импорты Features запрещены.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*", "@pages/*", "@widgets/*", "@features/*"],
              message: "Entities может импортировать только shared.",
            },
            {
              group: ["@entities/*"],
              message: "Межслайсовые импорты Entities запрещены.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@app/*",
                "@pages/*",
                "@widgets/*",
                "@features/*",
                "@entities/*",
              ],
              message: "Shared не может импортировать верхние слои.",
            },
          ],
        },
      ],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...fsdBoundaries,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
