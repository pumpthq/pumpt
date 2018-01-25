import React, {Component, PropTypes} from 'react'
import {SimpleInput} from './../inputs'

class List2ItemUserEntered extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
        let { onClick, onValueChange, id } = this.props
        let { value } = this.state
        onClick({
            id: id
        })
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
        let { text, id, isSelected, preselectedValue, otherPlaceholder } = this.props
        if(isSelected) {
            return (
                <div>
                    <li
                        className={this.makeClassName()}
                        key={id}
                        onClick={this.handleClick}
                    ><span class='link_size_xl'>{text}</span></li>
                    <SimpleInput
                        value={preselectedValue}
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

List2ItemUserEntered.PropTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    onValueChange: PropTypes.func,
    isSelected: PropTypes.bool,
    noOneSelected: PropTypes.bool,
    preselectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    otherPlaceholder: PropTypes.string
}

List2ItemUserEntered.defaultProps = {
    text: '',
    value: '',
    id: '',
    isSelected: false,
    onClick: () => {},
    onValueChange: () => {},
    noOneSelected: true,
    preselectedValue: '',
    otherPlaceholder: PropTypes.string
}

export {
    List2ItemUserEntered as ListItemUserEntered
}
