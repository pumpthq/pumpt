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
      const { icon, disabled, children, onClick, secondary } = this.props
      const buttonClass = 'button_type_colored' + (
      secondary  ? ' button_type_colored_invert': ''
    )

      return (
            <button onClick={e=> {e.preventDefault(); onClick()}} disabled={disabled} className={buttonClass}>
                {icon}
                <span className="icon__text">{children}</span>
            </button>
        )
    }
}

ButtonLink.propTypes = propTypes;
ButtonLink.defaultProps = defaultProps;
