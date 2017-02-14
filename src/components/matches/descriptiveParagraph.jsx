import React, {Component, PropTypes} from 'react';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    className: PropTypes.string
};

const defaultProps = {
    children: '',
    className: ''
};

export default class DescriptiveParagraph extends Component {
    render() {
        const { children, className } = this.props
        return (
            <p className={'mdl-card__supporting-text card__supporting-text ' + className}>
                {children}
            </p>
        )
    }
}

DescriptiveParagraph.propTypes = propTypes;
DescriptiveParagraph.defaultProps = defaultProps;
