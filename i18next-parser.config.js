module.exports = {
  output: "src/assets/locales/$LOCALE/$NAMESPACE.json",
  locales: ["nl", "en"],
  keySeparator: "::",
  namespaceSeparator: ":::",
  createOldCatalogs: false,
  sort: true,
  lexers: {
    js: ["JsxLexer"],
  },
  reactNamespace: true,
};
module.exports = {
  output: "public/locales/$LOCALE/$NAMESPACE.json",
  locales: ["nl", "en"],
  keySeparator: "::",
  namespaceSeparator: ":::",
  createOldCatalogs: false,
  sort: true,
  lexers: {
    js: ["JsxLexer"],
  },
  reactNamespace: true,
};