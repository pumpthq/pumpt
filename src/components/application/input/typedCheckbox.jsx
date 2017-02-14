import React, { Component, PropTypes } from 'react'
import OkIcon from './../../icons/ok'
import OnboardingInput from './../../onboarding/onboardingInput'
import CheckboxInput from './checkboxInput'

class ApplicationTypedCheckbox extends Component {

    render() {
        const {
            title,
            placeholder,
            value,
            items,
            onChange
        } = this.props

        return (
            <fieldset class="row form__row form__row_indent-size_m">
                <CheckboxInput label={title} isChecked={value} onChange={(event => {
                    const isChecked = event.target.checked

                    onChange({
                        title,
                        value : isChecked,
                        alternative : true,
                        items
                    })
                })} value={value}/>
                {value ? items.map((item, index) => {
                    return (
                        <OnboardingInput
                            additionalClass={!item.value ? '' : 'textfield_filled'}
                            key={item.isFocused ? `focused-${index}` : index}
                            ref={`item-${index}`}
                            label={!item.value ? placeholder : null}
                            textFieldSize={false}
                            onFocus={() => {
                                onChange({
                                    title,
                                    value,
                                    alternative: true,
                                    items : items
                                        .map((inItem, inIndex) => {
                                            const newInItem = {
                                                ...inItem,
                                                isFocused : false
                                            }

                                            if (index === inIndex) {
                                                newInItem.isFocused = true
                                            }
                                            return newInItem
                                        })
                                })
                            }}
                            onChange={(event) => {
                                const targetValue = event.target.value

                                onChange({
                                    title,
                                    value,
                                    alternative : true,
                                    items : items.map((inItem, inIndex) => {
                                        if (index === inIndex) {
                                            return Object.assign({}, inItem, {
                                                value : targetValue
                                            })
                                        }

                                        return Object.assign({}, inItem)
                                    })
                                })
                            }}
                            onKeyPress={(event) => {
                                const charCode = event.charCode

                                // TIP On enter
                                if (charCode === 13) {
                                    event.preventDefault()

                                    let currentFocus = null
                                    const newItems = items
                                        .map((inItem, inIndex) => {
                                            if (inIndex === index) {
                                                currentFocus = {
                                                    ...inItem
                                                }
                                            }

                                            return {
                                                ...inItem,
                                                isFocused : false
                                            }
                                        })
                                        .filter((inItem) => (inItem.value))
                                        .concat([{}])

                                    const focusWillBeOnThis = newItems[
                                        currentFocus && currentFocus.value ?
                                        index + 1 : index
                                    ]

                                    if (focusWillBeOnThis) focusWillBeOnThis.isFocused = true
                                    onChange({
                                        title,
                                        value,
                                        alternative : true,
                                        items : newItems
                                    })
                                }
                            }}
                            onBlur={(event) => {
                                const targetValue = event.target.value

                                onChange({
                                    title,
                                    value,
                                    alternative: true,
                                    items : items
                                        .map((inItem, inIndex) => {
                                            const newInItem = {
                                                ...inItem,
                                                isFocused : false
                                            }

                                            if (index === inIndex) {
                                                newInItem.value = targetValue
                                            }
                                            return newInItem
                                        })
                                        .filter((inItem) => (inItem.value))
                                        .concat([{}])
                                })
                            }}
                            value={item.value}
                            afterImg={
                                <svg class="icon icon-ok icon-ok_blue">
                                    <use xlinkHref="#okIcon">
                                        <symbol id="okIcon" viewBox="0 0 14.812 11.219">
                                            <path
                                                className="colored-stroke cls-1"
                                                d="M1.744,5.608 L6.405,10.874 L14.561,1.659"
                                            />
                                        </symbol>
                                    </use>
                                </svg>
                            }
                            autoFocus={item.isFocused}
                        />
                    )
                }) : null}
            </fieldset>
        )
    }
}

ApplicationTypedCheckbox.propTypes = {
    title : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value : PropTypes.bool,
    alternative : PropTypes.bool,
    items : PropTypes.arrayOf(PropTypes.shape({
        title : PropTypes.string,
        value : PropTypes.string,
        isFocused : PropTypes.bool
    })).isRequired,
    onChange : PropTypes.func.isRequired
}

ApplicationTypedCheckbox.defaultProps = {
    onChange : (event) => {}
}

export default ApplicationTypedCheckbox
