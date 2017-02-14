import React, { Component, PropTypes } from 'react'

const propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string
    ]),
    onClick : PropTypes.func,
    disabled : PropTypes.bool,
    typeColored : PropTypes.bool,
    buttonSize : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    buttonColor: PropTypes.string,
    type : PropTypes.string
}

const defaultProps = {
    children : '',
    onClick : () => {
    },
    disabled : false,
    typeColored : false,
    buttonSize : false,
    type : 'button'
}

export default class button extends Component {
    makeClasses(initial) {
        let { className, typeColored, buttonSize, buttonColor } = this.props
        let classes = [initial, className]

        if (typeColored) classes.push('button_type_colored');
        if (buttonSize) classes.push('button_size_' + buttonSize.toLowerCase());
        if (buttonColor) classes.push('button_color_' + buttonColor.toLowerCase());
        return classes.join(' ');
    }

    render() {
        return (
            <button
                class={this.makeClasses('mdl-button button')}
                type={this.props.type}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

button.propTypes = propTypes;
button.defaultProps = defaultProps;
