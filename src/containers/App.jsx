import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

// import { cleanMessage } from '../actions/session';

// import SESSION from '../constants/session';

import './../styles/app.less';

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

export const mapStateToProps = (state) =>
     ({ state })
;

@connect(mapStateToProps, { /* cleanMessage */ })
class App extends Component {

    componentWillMount() {
        // if (SESSION.length && SESSION[0].message) {
        //     const { message: { value } } = SESSION[0];
        //     value && alert(value);
        // }
    }

    componentDidMount() {
        // this.props.cleanMessage();
        // if (SESSION.length && SESSION[0].message) {
        //     SESSION[0].message = undefined;
        // }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="app">
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
