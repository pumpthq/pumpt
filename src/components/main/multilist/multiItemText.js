import React, { Component, PropTypes } from 'react'

class MultiItemText extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()

        let { onValueChange, id, value } = this.props

        onValueChange({
            id: id,
            value: value
        })
    }

    makeClassName() {
        let finalClassName = 'link_size_xl multi__item'
        let { isSelected, noOneSelected } = this.props
        if(noOneSelected) {
            finalClassName += ' link'
        } else {
            if(isSelected) {
                finalClassName += ' link multi__item_selected'
            } else {
                finalClassName += ' link'
            }
        }
        return finalClassName
    }

    render() {
        let { text, id } = this.props
        return (
            <li
                className={this.makeClassName()}
                key={id}
                onClick={this.handleClick}
            ><span class='link_size_xl'>{text}</span></li>
        )
    }
}

MultiItemText.PropTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    onValueChange: PropTypes.func,
    isSelected: PropTypes.bool,
    noOneSelected: PropTypes.bool
}

MultiItemText.defaultProps = {
    text: '',
    value: '',
    id: '',
    isSelected: false,
    noOneSelected: true
}

export {
    MultiItemText as MultiItemText
}
