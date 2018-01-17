import React, { Component, PropTypes } from 'react'
import { MultiItem } from './index'
const LIST_ITEM_TYPE_TEXT = 'list.item.type.text'

class MultiItemGroup extends Component {
    constructor(props) {
        super(props)

        this.handleGroupClick = this.handleGroupClick.bind(this)
        this.makeUnGrouppedClassName = this.makeUnGrouppedClassName.bind(this)
        this.makeGroupClassName = this.makeGroupClassName.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
    }

    handleEnter(otherId, value) {
      let { handleEnter, id } = this.props;
      handleEnter(otherId, value, id);
    }

    handleGroupClick(e) {
        e.preventDefault()

        const { onGroupClick, id, isActive } = this.props

        if (!isActive) {
          return;
        }
          onGroupClick(id);
    }

    makeUnGrouppedClassName() {
        let { classesToAdd } = this.props
        let finalClassName = 'list'

        classesToAdd.map((className) => {
            finalClassName += ' ' + className
        })

        return finalClassName
    }

    makeGroupClassName() {
        let finalClassName = 'list__item list__item_sub_true'
        const { isOpened } = this.props
        if(isOpened) {
            finalClassName += ' list__item_active'
        }
        return finalClassName
    }

    render() {
        const {
            text,
            id,
            items,
            onValueChange,
            selectedItems,
            handleGroups,
          otherPlaceholder,
          isActive,
          additionalItems
        } = this.props

      const compare = (a,b) => {
        if (a.type === LIST_ITEM_TYPE_TEXT && b.type === LIST_ITEM_TYPE_TEXT) {
          return 0;
        } else if (a.type === LIST_ITEM_TYPE_TEXT) {
          return -1;
        } else {
          return 1;
        }
      }

        if(handleGroups) {
            return(
                <li class={this.makeGroupClassName()}>
                    <a class={('link link_size_xl' + (isActive ? '' : ' link_color_l-grey link_type_nopointer'))}
                        onClick={this.handleGroupClick}
                    >{text}</a>
                    <ul class='multi multi_type_sublayer'>
                        {
                          items.concat(additionalItems)
                            .sort(compare)
                            .map(item => {
                                const val = selectedItems.has(item.id) ?
                                    selectedItems.get(item.id).value : '';
                                return(
                                    <MultiItem
                                        {...item}
                                        onValueChange={onValueChange}
                                        isSelected={selectedItems.has(item.id)}
                                        preselectedValue={val}
                                        noOneSelected={selectedItems.length === 0}
                                        otherPlaceholder={otherPlaceholder}
                                        onEnter={this.handleEnter}
                                    />
                                )
                            })
                        }
                    </ul>
                </li>
            )
        } else {
            return(
                <ul className={this.makeUnGrouppedClassName()}>
                {
                  items.concat(additionalItems)
                  .sort(compare)
                  .map(item => {
                        const val = selectedItems.has(item.id) ?
                            selectedItems.get(item.id).value : '';
                        return(
                            <MultiItem
                                {...item}
                                onValueChange={onValueChange}
                                isSelected={selectedItems.has(item.id)}
                                preselectedValue={val}
                                noOneSelected={selectedItems.length === 0}
                                otherPlaceholder={otherPlaceholder}
                                onEnter={this.handleEnter}
                            />
                        )
                    })
                }
                </ul>
            )
        }
        return(
            <ul></ul>
        )
    }
}

MultiItemGroup.PropTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    handleGroups: PropTypes.bool,
    onValueChange: PropTypes.func,
    onGroupClick: PropTypes.func,
    selectedItems: PropTypes.instanceOf(Map),
    text: PropTypes.string,
    id: PropTypes.string,
    isOpened: PropTypes.bool,
    classesToAdd: PropTypes.string,
    otherPlaceholder: PropTypes.string,
    handleEnter: PropTypes.func
}

MultiItemGroup.defaultProps = {
    handleEnter: () => {}
}

export {
    MultiItemGroup
}
