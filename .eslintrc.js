module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/all",
    "prettier",
  ],
  ignorePatterns: [
    "node_modules",
    ".eslintrc.js",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "@typescript-eslint/tslint",
    "prefer-arrow",
    "import",
    "no-null",
    "unicorn",
    "jsdoc",
    "promise",
    "prettier",
    "only-warn",
  ],
  root: true,
  rules: {
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "type",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "@antib-es/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "../../../**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "../../**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "../**",
            group: "parent",
            position: "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["type"],
        "newlines-between": "always",
      },
    ],

    "no-prototype-builtins": "off",
    "no-case-declarations": "warn",

    "prettier/prettier": [
      "warn",
      {
        "printWidth": 120,
        "tabWidth": 2,
        "useTabs": false,
        "endOfLine": "auto",
        "singleQuote": true,
        "quoteProps": "consistent",
        "trailingComma": "all",
        "arrowParens": "avoid",
        "semi": true,
        "bracketSpacing": true
      }
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],

    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "@typescript-eslint/no-confusing-void-expression": ["warn", { ignoreArrowShorthand: true }],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/init-declarations": "off",
    "@typescript-eslint/require-array-sort-compare": ["warn", { ignoreStringArrays: true }],
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/parameter-properties": "off",

    "@typescript-eslint/member-ordering": [
      "warn",
      { "default": ["field", "constructor", "signature", "method"] }
    ],

    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/ban-types": "warn",
  },
};
