import React, {Component, PropTypes} from 'react'

class List2ItemText extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()

        let { onClick, onValueChange, id, value } = this.props

        onClick({
            id: id,
            value: value
        })
        onValueChange({
            id: id,
            value: value
        })
    }

    makeClassName() {
        let finalClassName = 'link_size_xl list__item'
        let { isSelected, noOneSelected } = this.props
        if(noOneSelected) {
            finalClassName += ' link'
        } else {
            if(isSelected) {
                finalClassName += ' link'
            } else {
                finalClassName += ' link link_color_l-grey'
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

List2ItemText.PropTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    onValueChange: PropTypes.func,
    isSelected: PropTypes.bool,
    noOneSelected: PropTypes.bool
}

List2ItemText.defaultProps = {
    text: '',
    value: '',
    id: '',
    isSelected: false,
    noOneSelected: true
}

export {
    List2ItemText as ListItemText
}
