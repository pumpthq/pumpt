import React, { Component, PropTypes } from 'react'
import { ListItemGroup } from './index'

class List2Component extends Component {
    constructor(props) {
        super(props)
        const { preselectedItem, preselectedValue } = props

        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleGroupClick = this.handleGroupClick.bind(this)
        this.toggleGroup = this.toggleGroup.bind(this)
        this.isGroupOpened = this.isGroupOpened.bind(this)
        this.getParent = this.getParent.bind(this)

        this.state = {
            selectedItemId: preselectedItem,
            selectedValue: preselectedValue,
            openGroupsId: []
        }
    }

    componentDidMount() {
        const { preselectedItem } = this.props
        let parent = this.getParent(preselectedItem)
        this.setState({
            openGroupsId: this.toggleGroup(parent.id)
        })
    }

    makeClassName() {
        let { classesToAdd } = this.props
        let finalClassName = 'list'

        classesToAdd.map((className) => {
            finalClassName += ' ' + className
        })

        return finalClassName
    }

    render() {
        const { items, preselectedValue, handleGroups, classesToAdd, otherPlaceholder } = this.props
        const { selectedItemId, selectedValue } = this.state
        const noOneSelected = selectedItemId === ''

        return(
            <ul class={this.makeClassName()}>
            {
                items.map(group => {
                    return(
                        <ListItemGroup
                            {...group}
                            onClick={this.handleItemClick}
                            onValueChange={this.handleValueChange}
                            onGroupClick={this.handleGroupClick}
                            selectedItemId={selectedItemId}
                            selectedValue={selectedValue}
                            handleGroups={handleGroups}
                            isOpened={this.isGroupOpened(group.id)}
                            classesToAdd={classesToAdd}
                            otherPlaceholder={otherPlaceholder}
                        />
                    )
                })
            }
            </ul>
        );
    }

    handleItemClick({ id }) {
        this.setState({
            selectedItemId: id
        })
    }

    handleGroupClick(groupId) {
        this.setState({
            openGroupsId: this.toggleGroup(groupId)
        })
    }

    handleValueChange({ id, value }) {
        this.setState({
            selectedItemId: id,
            selectedValue: value
        })
        this.props.listValueSelected({
            id: id,
            value: value,
            parent: this.getParent(id)
        })
    }

    toggleGroup(groupIdClicked) {
        const { openGroupsId } = this.state
        console.log(`Toggled ${groupIdClicked}`)
        console.log(openGroupsId)
        let wasItemInLIst = false
        let newOpenGroupsId = []
        openGroupsId.map((groupId) => {
            if(groupId !== groupIdClicked) {
                newOpenGroupsId.push(groupId)
            } else {
                wasItemInLIst = true
            }
        })
        if(!wasItemInLIst) {
            newOpenGroupsId.push(groupIdClicked)
        }
        return newOpenGroupsId
    }

    isGroupOpened(groupId) {
        const { openGroupsId } = this.state
        let wasGroupFind = false
        openGroupsId.map((listGroupId) => {
            if(listGroupId === groupId) {
                wasGroupFind = true
            }
        })
        return wasGroupFind
    }

    getParent(itemId) {
        const { items } = this.props
        let parent = {
            id: '',
            value: ''
        }
        items.map((group) => {
            const groupItems = group.items
            groupItems.map((item) => {
                if(item.id === itemId) {
                    parent.id = group.id
                    parent.value = group.text
                    return
                }
            })
        })
        return parent
    }
}

List2Component.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    classesToAdd: PropTypes.arrayOf(PropTypes.string),
    allowNoSelection: PropTypes.bool,
    listValueSelected: PropTypes.func,
    preselectedItem: PropTypes.string,
    preselectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    handleGroups: PropTypes.bool,
    otherPlaceholder: PropTypes.string
}

List2Component.defaultProps = {
    items: [],
    classesToAdd: [],
    allowNoSelection: true,
    listValueSelected: () => {},
    preselectedItem: '',
    preselectedValue: '',
    handleGroups: false,
    otherPlaceholder: ''
}

export default List2Component
