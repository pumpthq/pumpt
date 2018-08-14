import React, {Component, PropTypes} from 'react'
import {Checkbox} from 'material-ui'

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

    render() {
        let { text, id } = this.props
      return (
        <Checkbox
          value={text}
          key={id}
          label={text}
          onCheck={this.handleClick}
          checked={this.props.isSelected}
          className="my-2"
        />
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
