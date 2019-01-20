module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  parser: "babel-eslint",
  plugins: ["react", "jsx-a11y", "import", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        moduleDirectory: ["node_modules", "src"]
      }
    }
  },
  rules: {
    "prettier/prettier": "warn",
    "react/require-extension": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: false
      }
    ]
  }
};
