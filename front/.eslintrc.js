module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": "warn", //　未使用の変数があったら警告
    eqeqeq: "error", // '==='と'!=='を強制
    curly: ["error", "multi"], // if文の{}を強制
    semi: ["error", "always"], // セミコロンを強制
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
