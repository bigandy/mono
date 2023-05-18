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
    "^[~]",
    "",
    "^[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
