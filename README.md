# pumpt-spa

## Requirements

Node `^8.9`, NPM `^5.5`

## Build overview

There are several build configurations or *modes*, each for a different type of
deploy.

### Dev Mode

Dev mode is for local development. To run in development mode, do following steps:

1. `npm install`
2. `npm run start`

Alternatively, to run in development mode with proxying to the staging API:

1. `npm install`
2. `npm run start/api:staging`

This mixed mode runs the app locally, but points to the staging server to
resolve API calls. It's convenient because it doesn't require the API server to
be run locally.

### Staging mode

We use `pm2` to manage the app on staging. `pm2` is a simple
project manager with utilities to aid with load balancing and scaling.

While the `pm2` command is available on both staging and productions, it is not
included in the dev-dependencies for the project. If testing locally or provisioning
a new server, you must install it globally with `npm i -g pm2@2.7.2`.

1. `npm install`
2. `npm run build:staging` in order to make a build.
3. `npm run start:staging`

The last command above runs pm2 under the hood.

### Production mode

In production, `pm2` is used to manage the application. `pm2` is a simple
project manager with utilities to aid with load balancing and scaling.

To deploy:

1. `npm install`
2. `npm run build:production` in order to make a build.
3. `npm run start:production`

The `npm run start:production` command above runs pm2 under the hood.

Some useful pm2 commands:

* `pm2 list` lists running processes managed by pm2
* `pm2 restart all` restarts all processes managed by pm2
* `pm2 logs` outputs the logs of managed processes to the console

## Testing

We are rolling out snapshot testing with Jest. Before each commit, please ensure
that any react components involved in the commit have snapshot test coverage.
**Make sure to commit the new snapshots**.

Snapshot testing allows us to prevent regressions by triggering a test failure
if any React component renders differently than in a previous snapshot. If the
change is unintentional, please fix the regression before comitting! If the
change is intentional, update the snapshot to reflect this.

1. `npm run test` to perform a regression test (this will also create inital
snapshots for new tests.)
2. Observed the output and fix regressions if necessary
3. Rerun tests until you've determine that all changes are intentional
4. `npm run test -- -u` to update the snapshots.

## DevTools

Since this client-side app is running **Redux** on top of **React**, a proper
debugging tool is required navigate through state changes when tracking down
the source of any bugs or issues.

Currently, the app is configured for [Redux
DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
(Google Chrome), as well as its partner extension for Firefox.

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
