# pumpt-spa

## Quick overview

To launch spa please do following steps:

1. `npm install`
2. `npm run start:dev` in order to work with latest deployed API
or `npm run start` to continue working with local API.

To do a commit, use `npm run commit` in order to follow conventional commit system.
Before any push action project will run `npm run lint` to check code style.
If you want to skip it go with `git push --no-verify`

## DevTools

Since this client-side app is running **Redux** on top of **React**, a proper debugging tool is required navigate through state changes when tracking down the source of any bugs or issues.

Currently, the app is configured for [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), which can be installed and used on [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html).

## Staging deployment

1. `npm install`
2. `npm run build` in order to make a build.
3. `npm run start:dev`

## Production deployment

In production, `pm2` is used to auto-scale and load-balance instances of our application to meet demand. To deploy:

1. `npm install`
2. `npm run build` in order to make a build.
4. `npm run start:prod`

Because `pm2` will run our instances as separate child processes, errors and other logs will not be produced in the console.  

To print production logs into the console, run `pm2 logs`

## Requirements

Node `^6.8`, NPM `^3.8`
