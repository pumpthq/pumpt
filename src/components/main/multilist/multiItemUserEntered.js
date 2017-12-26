import React, { Component, PropTypes } from 'react'
import { SimpleInput } from './../inputs'

class MultiItemUserEntered extends Component {
    constructor(props) {
        super(props)

        const { preselectedValue } = this.props

        this.state = {
            value: preselectedValue
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
        let { onValueChange, id } = this.props
        let { value } = this.state
        onValueChange({
            id: id,
            value: value
        })
    }

    handleValueChange(value) {
        let { onValueChange, id } = this.props
        this.setState({
            value: value
        })
        onValueChange({
            id: id,
            value: value
        })
    }

    makeClassName() {
        let finalClassName = 'list__item with-child-control'
        let { isSelected, noOneSelected } = this.props
        if(noOneSelected) {
            finalClassName += ' link'
        } else {
            if(isSelected) {
                finalClassName += ' link'
            } else {
                finalClassName += '  link_color_l-grey'
            }
        }
        return finalClassName
    }

    render() {
        let { text, id, isSelected, otherPlaceholder } = this.props
        let {value} = this.state
        if(isSelected) {
            return (
                <div>
                    <li
                        className={this.makeClassName()}
                        key={id}
                        onClick={this.handleClick}
                    ><span class='link_size_xl'>{text}</span></li>
                    <SimpleInput
                        value={value}
                        onValueChange={this.handleValueChange}
                        placeholder={otherPlaceholder}
                    />
                </div>
            )
        } else {
            return (
                <li
                    className={this.makeClassName()}
                    key={id}
                    onClick={this.handleClick}
                ><span class='link_size_xl'>{text}</span></li>
            )
        }
    }
}

MultiItemUserEntered.PropTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    onValueChange: PropTypes.func,
    isSelected: PropTypes.bool,
    noOneSelected: PropTypes.bool,
    otherPlaceholder: PropTypes.string
}

MultiItemUserEntered.defaultProps = {
    text: '',
    value: '',
    id: '',
    isSelected: false,
    onValueChange: () => {},
    noOneSelected: true,
    otherPlaceholder: PropTypes.string
}

export {
    MultiItemUserEntered as MultiItemUserEntered
}
