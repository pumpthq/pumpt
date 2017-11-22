# pumpt-spa

## Quick overview

To run in development mode, do following steps:

1. `npm install`
2. `npm run start`

Alternatively, to run in development mode with proxying to the staging API:

1. `npm install`
2. `npm run start/api:staging`

Using this mixed mode it convenient because it doesnt require the API server to be run locally.

~~To do a commit, use `npm run commit` in order to follow conventional commit system.
Before any push action project will run `npm run lint` to check code style.
If you want to skip it go with `git push --no-verify`~~

## DevTools

Since this client-side app is running **Redux** on top of **React**, a proper debugging tool is required navigate through state changes when tracking down the source of any bugs or issues.

Currently, the app is configured for [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), which can be installed and used on [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html).

## Staging deployment

1. `npm install`
2. `npm run build:staging` in order to make a build.
3. `npm run start:staging`

## Production deployment

In production, `pm2` is used to auto-scale and load-balance instances of our application to meet demand. To deploy:

1. `npm install`
2. `npm run build:production` in order to make a build.
4. `npm run start:production`

Because `pm2` will run our instances as separate child processes, errors and other logs will not be produced in the console.  

To print production logs into the console, run `pm2 logs`

## Requiring authentication for specific components
The component wrapper/decorator defined in `src/wrappers/RequireAuth.jsx` is used to ensure that a user is logged in before rendering the wrapped component.

Here's an example of usage within a `react-router` definition. It will add the login requirement to accessing the route `/`, which renders the `App` component:

```javascript
import RequireAuth from 'src/wrappers/RequireAuth.jsx'
import App from 'src/containers/App.jsx'

const rootRoute = {
    path: '/',
    component: RequireAuth(App), //require login to render App
}

/* ... */
```



## Requirements

Node `^8.9`, NPM `^5.5`
