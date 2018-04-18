import React, {Component, PropTypes} from 'react'

import {MultiItemText} from './multiItemText'
import {MultiItemUserEntered} from './multiItemUserEntered'

const LIST_ITEM_TYPE_TEXT = 'list.item.type.text'
const LIST_ITEM_TYPE_USER_ENTERED = 'list.item.type.userEntered'
const LIST_ITEM_TYPE_GROUP = 'list.item.type.group'

class MultiItem extends Component {
    render() {
        let { type } = this.props
        switch(type) {
            case LIST_ITEM_TYPE_TEXT:
                return(
                    <MultiItemText
                        {...this.props}
                    />
                )
            break

            case LIST_ITEM_TYPE_USER_ENTERED:
                return(
                    <MultiItemUserEntered
                        {...this.props}
                    />
                )
            break

            default:
                return(
                    <MultiItemText
                        {...this.props}
                    />
                )
            break
        }
    }
}

MultiItem.propTypes = {
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

MultiItem.defaultProps = {
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
    MultiItem,
    LIST_ITEM_TYPE_TEXT,
    LIST_ITEM_TYPE_USER_ENTERED
}
