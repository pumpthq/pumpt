# pumpt-spa

## Requirements

Node `^8.9`, NPM `^5.5`

## Development overview

Welcome to pumpt! This documentation codifies current practice for the basic
operations of the Pumpt App development process. It will cover expectations
related to:

- git and codereview
- testing and linting
- deploying
- developing

The Pumpt App lives in an ecosystem of Pumpt services. Four services exist, and
are roughly decoupled.

1. Pumpt App, this. A react app which serves as our users' primary interface.
2. Pumpt Admin, a separate application for the app administrators (our clients)
to manage.
3. Pumpt API, a back-end node HTTP service which feeds the App and Admin.
4. Pumpt Static, a static blog site.

### Git

We expect well-formed deliberate and well articulated commits. General
expectations can be found [here](https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53)

When contributing, start from the `staging` branch and checkout a topic branch
for your issue. When development is finished and your changes are *tested and
linted*, you're ready to start a code review! Open a
pull request through the UI on [github.com](github.com). Ask a teammember to
review and merge it!

After changes are stable on staging, they'll be moved to the production branch
and deployed.

### Testing

#### Jest

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

#### Eslint

Any new files created in your commit should come up clean on eslint. Eslint can
be run through `node_modules/.bin/eslint`. Make sure to narrow your linting to a
specific file or folder to avoid linting the whole repository! Protips:

- Use the `--fix` flag to automatically fix some lint errors.
- Consider an alias such as `alias lint=<project>/node_modules/.bin/eslint`

### Deployment

There are several build configurations or *modes*, each for a different type of
deploy.

#### Dev Mode

Dev mode is for local development. To run in development mode, do following steps:

1. `npm install`
2. `npm run start`

Alternatively, to run in development mode with proxying to the staging API:

1. `npm install`
2. `npm run start/api:staging`

This mixed mode runs the app locally, but points to the staging server to
resolve API calls. It's convenient because it doesn't require the API server to
be run locally.

#### Staging or Production mode

We use `pm2` to manage the app on staging and production. `pm2` is a simple
project manager with utilities to aid with load balancing and scaling.

While the `pm2` command is available on both staging and productions, it is not
included in the dev-dependencies for the project. If testing locally or provisioning
a new server, you must install it globally with `npm i -g pm2@2.7.2`.

1. `npm install`
2. `npm run build:<mode>` # where `<mode>` is one of `production` or `staging`
3. `npm run start:<mode>`

The last command above runs pm2 under the hood.

Some useful pm2 commands:

* `pm2 list` lists running processes managed by pm2
* `pm2 restart all` restarts all processes managed by pm2
* `pm2 logs` outputs the logs of managed processes to the console

### Development

Since this client-side app is running **Redux** on top of **React**, a proper
debugging tool is required navigate through state changes when tracking down
the source of any bugs or issues.

Currently, the app is configured for [Redux
DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
(Google Chrome), as well as its partner extension for Firefox.

#### Requiring authentication for specific components
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
