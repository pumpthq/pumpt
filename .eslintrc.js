module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": false}] 
  }
};
