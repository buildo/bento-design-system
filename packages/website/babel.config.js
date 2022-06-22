module.exports = {
  presets: [require.resolve("@docusaurus/core/lib/babel/preset")],
  sourceType: "unambiguous",
  plugins: ["@vanilla-extract/babel-plugin"],
};
