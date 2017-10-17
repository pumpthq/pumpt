import 'babel-polyfill';
import ReactDOM from 'react-dom';
import routes from './routes';

const app = document.getElementById('app');

ReactDOM.render(routes, app);

/* HMR opt-in setting for this module */
if(module.hot) {
  console.info('module hot loader enabled on app root')
  module.hot.accept()
}
