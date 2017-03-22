import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    onClick: PropTypes.func
};

const defaultProps = {
    children: '',
    to: false,
    onClick: e=>{}
};

export default class DropdownItem extends Component {
    render() {
        const { children, to, onClick } = this.props;


        if(to && to !== true) {
            return (
                <li className="list__item" onClick={onClick}>
                    <Link to={to} className="text">{children}</Link>
                </li>
            )
        }

        return (
            <li className="list__item" onClick={onClick}>
                <a className="text">{children}</a>
            </li>
        )
    }
}

DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;
