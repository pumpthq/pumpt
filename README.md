# pumpt-spa

## Quick overview

To launch spa please do following steps:

1. `npm install`
2. `npm run start:development` in order to work with latest deployed API
or `npm run start:local` to continue working with local API.

To do a commit, use `npm run commit` in order to follow conventional commit system.
Before any push action project will run `npm run lint` to check code style.
If you want to skip it go with `git push --no-verify`

## Production deployment

1. `npm install`
2. Check `process.json` which is a PM2 configuration file and choose environment.
3. `npm run build` in order to make a build.
4. `pm2 start process.json --env staging`

## Requirements

Node version `4.2.4`
NPM version `2.4.12`
