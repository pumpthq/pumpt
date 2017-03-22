import React, { Component, PropTypes } from 'react'
import ShortID from 'shortid'

class CheckboxInput extends Component {

    constructor(props) {
        super(props)

        this.inputOnChange = this.inputOnChange.bind(this)
    }

    componentWillMount() {
        this.id = ShortID.generate()
    }

    makeClasses(initial) {
        const classes = [initial]
        const { isChecked } = this.props

        if (isChecked) classes.push('is-checked')

        return classes.join(' ')
    }
    
    render() {
        const {
            inputOnChange
        } = this
        const { label, value } = this.props
            
        return (
            <label class={this.makeClasses('mdl-checkbox mdl-js-checkbox checkbox is-upgraded')}>
                <input
                    type="checkbox"
                    id="checkbox-1"
                    class="mdl-checkbox__input checkbox__input"
                    onClick={inputOnChange}
                    onChange={inputOnChange}
                    value={value}
                    checked={value}
                />
                <span class="mdl-checkbox__label checkbox__label">
                    {label}
                </span>
                <span class="mdl-checkbox__focus-helper"></span>
                <span class="mdl-checkbox__box-outline">
                    <span class="mdl-checkbox__tick-outline"></span>
                </span>
            </label>
        )
    }

    inputOnChange(event) {
        const { onChange } = this.props

        onChange.apply(this, [event])
    }
}

CheckboxInput.propTypes = {
    label : PropTypes.string,
    value : PropTypes.bool,
    isChecked : PropTypes.bool,
    onChange : PropTypes.func
}
CheckboxInput.defaultProps = {
    label : '',
    value : false,
    isChecked : false,
    onChange : (event) => {}
}

export default CheckboxInput
