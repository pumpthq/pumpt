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

export default class ButtonLink extends Component {
    render() {
        const { icon, children, onClick } = this.props
        return (
            <a onClick={onClick} className="link">
                {icon}
                <span className="icon__text">{children}</span>
            </a>
        )
    }
}

ButtonLink.propTypes = propTypes;
ButtonLink.defaultProps = defaultProps;
