module.exports = {
  presets: [
    ["@babel/preset-react", {
      targets: {
        browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
      },
    }],
  ],
  plugins: [
    "react-refresh/babel",
  ],
  sourceType: "unambiguous"
}