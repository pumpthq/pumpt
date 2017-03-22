import 'babel-polyfill';
import ReactDOM from 'react-dom';
import routes from './routes';
import { getAppData } from './onLoad';

const app = document.getElementById('app');

getAppData().then(() => {
    ReactDOM.render(routes, app);
});
