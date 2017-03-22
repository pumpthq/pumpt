import React, { Component, PropTypes } from 'react'
import { ListItem } from './index'

class List2ItemGroup extends Component {
    constructor(props) {
        super(props)

        this.handleGroupClick = this.handleGroupClick.bind(this)
        this.makeUnGrouppedClassName = this.makeUnGrouppedClassName.bind(this)
        this.makeGroupClassName = this.makeGroupClassName.bind(this)
    }

    handleGroupClick(e) {
        e.preventDefault()

        const { onGroupClick, id } = this.props
        onGroupClick(id)
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
            key,
            items,
            onClick,
            onValueChange,
            handleGroups,
            selectedItemId,
            selectedValue,
            otherPlaceholder
        } = this.props
        if(handleGroups) {
            return(
                <li class={this.makeGroupClassName()}>
                    <a class='link link_size_xl'
                        onClick={this.handleGroupClick}
                    >{text}</a>
                    <ul class='list list_type_sublayer'>
                        {
                            items.map(item => {
                                return(
                                    <ListItem
                                        {...item}
                                        onClick={onClick}
                                        onValueChange={onValueChange}
                                        isSelected={selectedItemId === item.id}
                                        noOneSelected={selectedItemId === ''}
                                        preselectedValue={selectedValue}
                                        otherPlaceholder={otherPlaceholder}
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
                    items.map(item => {
                        return(
                            <ListItem
                                {...item}
                                onClick={onClick}
                                onValueChange={onValueChange}
                                isSelected={selectedItemId === item.id}
                                noOneSelected={selectedItemId === ''}
                                preselectedValue={selectedValue}
                                otherPlaceholder={otherPlaceholder}
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

List2ItemGroup.PropTypes = {
    onClick: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    handleGroups: PropTypes.bool,
    onClick: PropTypes.func,
    onValueChange: PropTypes.func,
    onGroupClick: PropTypes.func,
    selectedItemId: PropTypes.string,
    selectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    text: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string,
    isOpened: PropTypes.bool,
    classesToAdd: PropTypes.string,
    otherPlaceholder: PropTypes.string
}

List2ItemGroup.defaultProps = {

}

export {
    List2ItemGroup
}
