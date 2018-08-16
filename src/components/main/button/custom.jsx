import React, {Component, PropTypes} from 'react'
import {Checkbox} from 'material-ui'

const propTypes = {
    onEnter : PropTypes.func,
    typeColored : PropTypes.bool,
    buttonColor: PropTypes.string,
    text: PropTypes.string,
}

const defaultProps = {
    onEnter : () => {
    },
    text : 'Other'
}

export default class button extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = {
          value: '',
          focused: false,
        }
    }

    render() {
      const { value, focused } = this.state;
      const { placeHolder } = this.props;
      return (
        <div className="custom-input-set row">
          <div className="col-auto checkbox-submit pr-0">
            <Checkbox
              checked={false}
              value="Other"
              label=""
              onCheck={() => {
                this.props.onEnter(value);
                this.setState({value: ''})
              }}
            />
          </div>
          <div className="col px-0 application-form">
            <input
              className={'custom-input my-0 py-0'}
              type="text"
              onChange={this.handleValueChange}
              onKeyPress={this.handleKeyPress}
              onFocus={() => this.setState({focused: true})}
              onBlur={() => this.setState({focused: false})}
              value={value || focused ? value : placeHolder}
            />
          </div>
        </div>
      )
    }

    handleKeyPress(event) {
      const { onEnter } = this.props
      const { value } = this.state
        if (event.key === 'Enter' && value.trim() !== '') {
          event.preventDefault();
           onEnter(value);
          this.setState({value: ''});
        }
    }

    handleValueChange(event) {
      event.preventDefault();
      this.setState({value: event.target.value});
    }
}

button.propTypes = propTypes;
button.defaultProps = defaultProps;
