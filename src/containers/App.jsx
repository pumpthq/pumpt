import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {getAppData} from '../onLoad';
import './../styles/app.less';
// ⚠️ Tap event required to support material-ui click events
import injectTapEventPlugin from 'react-tap-event-plugin';
import { DEGREE_DROPDOWN_DATA } from '../constants/candidateOnboarding';

// import { cleanMessage } from '../actions/session';

// import SESSION from '../constants/session';
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
  constructor(props) {
    super(props)
    this.state = {isLoading:false}
  }
  componentWillMount() {
    getAppData()
    .then(()=>{
      this.setState({isLoading:true})
    })
  }


    render() {
      const {isLoading} = this.state
      if(!isLoading) {
        return (<div>Loading app data...</div>)
      }else{
        return (
            <MuiThemeProvider>
                <div className="app page wall wall_type_revert wall_image_second">
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
      }
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
