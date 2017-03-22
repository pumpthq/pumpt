import React, { Component, PropTypes } from 'react'
import yearRange from 'year-range-regex'

class DateInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isFocused : false
        }

        this.inputOnFocus = this.inputOnFocus.bind(this)
        this.inputOnBlur = this.inputOnBlur.bind(this)
    }

    makeClasses(initial) {
        const classes = [initial]
        const { isFocused } = this.state
        const { error } = this.props

        if (isFocused) classes.push('is-focused')
        if (error) classes.push('is-invalid')

        return classes.join(' ')
    }

    focusing(bool) {
        this.setState({
            isFocused : bool
        })
    }

    render() {
        const {
            props,
            inputOnFocus,
            inputOnBlur
        } = this
        const {
            fields : {
                month,
                year
            },
            error,
            onKeyPress,
            monthRegex,
            yearRegex
        } = props

        return (
            <div class={this.makeClasses('mdl-js-textfield mdl-textfield textfield textfield_type_date')}>
                <input class="mdl-textfield__input textfield__input"
                    {...month}
                    type="number"
                    min="1"
                    max="12"
                    {...{
                        onFocus : (event) => {
                            inputOnFocus(event)
                            month.onFocus(event)
                        },
                        onKeyPress,
                        onChange : (event) => {
                            const { value } = event.target

                            event.preventDefault()

                            if (value && value.length > 0) {
                                if (monthRegex.test(value)) {
                                    month.onChange(event)
                                }
                            } else {
                                month.onChange(event)
                            }
                        },
                        onBlur : (event) => {
                            inputOnBlur(event)
                            month.onBlur(event)
                        }
                    }}
                />
                <span class="text text_size_xs textfield__separator">/</span>
                <input class="mdl-textfield__input textfield__input"
                    {...year}
                    type="number"
                    min="1"
                    max="9999"
                    {...{
                        onFocus : (event) => {
                            inputOnFocus(event)
                            year.onFocus(event)
                        },
                        onKeyPress,
                        onChange : (event) => {
                            const { value } = event.target

                            event.preventDefault()

                            if (value && value.length > 0) {
                                if (yearRegex.test(value)) {
                                    year.onChange(event)
                                }
                            } else {
                                year.onChange(event)
                            }
                        },
                        onBlur : (event) => {
                            inputOnBlur(event)
                            year.onBlur(event)
                        }
                    }}
                />
                <span class="mdl-textfield__label textfield__label">
                    <span class="textfield__label-item">{month.value ? null : 'mm'}</span>
                    <span class="textfield__label-item">{year.value ? null : 'yyyy'}</span>
                </span>
                <span class="mdl-textfield__error textfield__error">{error}</span>
            </div>
        )
    }

    inputOnFocus(event) {
        const { onFocus } = this.props

        this.focusing(true)
        onFocus.apply(this, [event])
    }

    inputOnBlur(event) {
        const { onBlur } = this.props

        this.focusing(false)
        onBlur.apply(this, [event])
    }

}

DateInput.propTypes = {
    value : PropTypes.string,
    fields : PropTypes.shape({
        month : PropTypes.object,
        year : PropTypes.object
    }),
    error : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    onChange : PropTypes.func,
    onFocus : PropTypes.func,
    onBlur : PropTypes.func,
    onKeyPress : PropTypes.func,
    monthRegex : PropTypes.object,
    yearRegex : PropTypes.object
}
DateInput.defaultProps = {
    value : null,
    error : false,
    onChange : () => {},
    onFocus : () => {},
    onBlur : () => {},
    onKeyPress : (event) => {
        if (event.which < 48 || event.which > 57) {
            event.preventDefault()
        }
    },
    monthRegex : new RegExp(yearRange(1, 12)),
    yearRegex : new RegExp(yearRange(1, 9999))
}

export default DateInput
