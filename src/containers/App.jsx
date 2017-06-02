import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

import { resolveUser } from '../actions/authorization'
// import { cleanMessage } from '../actions/session';

// import SESSION from '../constants/session';

import './../styles/app.less';

// ⚠️ Tap event required to support material-ui click events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element,
    ]),
};
const defaultProps = {
    children: '',
};

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div className="app page wall wall_type_revert wall_image_second">
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
