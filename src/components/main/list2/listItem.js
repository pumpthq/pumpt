import React, { Component, PropTypes } from 'react'

import { ListItemText } from './listItemText'
import { ListItemUserEntered } from './listItemUserEntered'

const LIST_ITEM_TYPE_TEXT = 'list.item.type.text'
const LIST_ITEM_TYPE_USER_ENTERED = 'list.item.type.userEntered'
const LIST_ITEM_TYPE_GROUP = 'list.item.type.group'

class List2Item extends Component {
    render() {
        let { type } = this.props
        switch(type) {
            case LIST_ITEM_TYPE_TEXT:
                return(
                    <ListItemText
                        {...this.props}
                    />
                )
            break

            case LIST_ITEM_TYPE_USER_ENTERED:
                return(
                    <ListItemUserEntered
                        {...this.props}
                    />
                )
            break

            default:
                return(
                    <ListItemText
                        {...this.props}
                    />
                )
            break
        }
    }
}

List2Item.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    onValueChange: PropTypes.func,
    isSelected: PropTypes.bool,
    value: PropTypes.string,
    type: PropTypes.string,
    noOneSelected: PropTypes.bool,
    preselectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

List2Item.defaultProps = {
    id: '',
    text: '',
    onClick: () => {},
    onValueChange: () => {},
    isSelected: false,
    value: '',
    type: LIST_ITEM_TYPE_TEXT,
    noOneSelected: true,
    preselectedValue: ''
}

export {
    List2Item,
    LIST_ITEM_TYPE_TEXT,
    LIST_ITEM_TYPE_USER_ENTERED
}
