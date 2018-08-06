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
        const { icon, children, onClick } = this.props
        return (
            <button onClick={e=> {e.preventDefault(); onClick()}} className="button_type_colored">
                {icon}
                <span className="icon__text">{children}</span>
            </button>
        )
    }
}

ButtonApply.propTypes = propTypes;
ButtonApply.defaultProps = defaultProps;
