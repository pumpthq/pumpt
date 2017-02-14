import React, {Component, PropTypes} from 'react';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    className: PropTypes.string,
    title: PropTypes.string
};

const defaultProps = {
    children: '',
    className: '',
    title: ''
};

export default class DescriptiveList extends Component {
    render() {
        const { children, className, title } = this.props
        return (
            <div className={'card__detail-item ' + className}>
                <h3 className="heading heading_type_three">{title}</h3>
                <ul className="list list_type_unnumeric">
                    {children}
                </ul>
            </div>
        )
    }
}

DescriptiveList.propTypes = propTypes;
DescriptiveList.defaultProps = defaultProps;
