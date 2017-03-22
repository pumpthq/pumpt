import React, {Component, PropTypes} from 'react';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    className: PropTypes.string,
    onClick: PropTypes.func
};

const defaultProps = {
    children: '',
    className: '',
    onClick: e => {}
};

export default class DescriptiveListItem extends Component {
    render() {
        const { children, className, onClick } = this.props
        return (
            <li className={'list__item ' + className} onClick={onClick}>
                {children}
            </li>
        )
    }
}

DescriptiveListItem.propTypes = propTypes;
DescriptiveListItem.defaultProps = defaultProps;
