import React, {Component, PropTypes} from 'react';

const propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array
    ]),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element
    ])
};

const defaultProps = {
    icon: '',
    children: ''
};

export default class ButtonApply extends Component {
    render() {
        const { icon, children } = this.props
        return (
            <button className="mdl-button button button_type_colored button_include_icon">
                {icon}
                <span className="icon__text">{children}</span>
            </button>
        )
    }
}

ButtonApply.propTypes = propTypes;
ButtonApply.defaultProps = defaultProps;
