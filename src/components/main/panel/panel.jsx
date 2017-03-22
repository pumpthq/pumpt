import React, { Component, PropTypes } from 'react';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element,
    ]),
    paddingBig: PropTypes.bool,
    paddingFalse: PropTypes.bool,
    typeOfNav: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: '',
    paddingBig: false,
    paddingFalse: false,
    typeOfNav: false,
    className: '',
};

export default class Panel extends Component {
    makeClasses() {
        const { paddingBig, paddingFalse, typeOfNav, className } = this.props;
        const classes = ['panel', className];

        if (paddingBig) classes.push('panel_padding_big');
        if (paddingFalse) classes.push('panel_padding_false');
        if (typeOfNav) classes.push('panel_type_on-nav');

        return classes.join(' ');
    }

    render() {
        return (
            <div class={this.makeClasses()}>
                {this.props.children}
            </div>
        );
    }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
