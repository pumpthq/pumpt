import React, {Component, PropTypes} from 'react';

class ListItem extends Component {
    render() {
        const { className, children } = this.props
        
        return (
            <li class={`list__item ${className}`}>
                {children}
            </li>
        )
    }
}

ListItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    className: PropTypes.string
}

ListItem.defaultProps = {
    children: '',
    className: ''
}

export default ListItem
