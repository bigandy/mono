const config = {
  importOrder: [
    "^react$",
    "",
    "next",
    "",
    "/(next-auth)/$",
    "/(react)+",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[~]/layouts",
    "",
    "^[~]/utils",
    "",
    "^[~]/components",
    "",
    "^[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
