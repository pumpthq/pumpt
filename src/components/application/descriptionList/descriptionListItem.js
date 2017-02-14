import React, {Component, PropTypes} from 'react';

class DescriptionListItem extends Component {

    render() {
        const { children } = this.props
        
        return (
            <dd className='list__item'>
                {children}
            </dd>
        )
    }

}

DescriptionListItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ])
}

export default DescriptionListItem
