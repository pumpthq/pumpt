import React, { Component, PropTypes } from 'react'
import { ListItem } from './index'

class List2 extends Component {
    constructor(props) {
        super(props)
        const { preselectedItem, preselectedValue } = props
        this.state = {
            selectedItemId: preselectedItem,
            selectedValue: preselectedValue
        }
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
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
        const { items, preselectedValue } = this.props
        const { selectedItemId, selectedValue } = this.state
        const noOneSelected = selectedItemId === ''
        return (
            <ul className={this.makeClassName()}>
            {
                items.map(item => {
                    return(
                        <ListItem
                            {...item}
                            onClick={this.handleItemClick}
                            onValueChange={this.handleValueChange}
                            isSelected={selectedItemId === item.id}
                            noOneSelected={noOneSelected}
                            preselectedValue={selectedValue}
                        />
                    )
                })
            }
            </ul>
        )
    }

    handleItemClick({ id }) {
        this.setState({
            selectedItemId: id
        })
    }

    handleValueChange({ id, value }) {
        this.setState({
            selectedItemId: id,
            selectedValue: value
        })
        this.props.listValueSelected({
            id: id,
            value: value
        })
    }
}

List2.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    classesToAdd: PropTypes.arrayOf(PropTypes.string),
    allowNoSelection: PropTypes.bool,
    listValueSelected: PropTypes.func,
    preselectedItem: PropTypes.string,
    preselectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

List2.defaultProps = {
    items: [],
    classesToAdd: [],
    allowNoSelection: true,
    listValueSelected: () => {},
    preselectedItem: '',
    preselectedValue: ''
}

export default List2
