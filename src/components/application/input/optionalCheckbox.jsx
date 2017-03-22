import React, { Component, PropTypes } from 'react'
import OnboardingInput from './../../onboarding/onboardingInput'
import CheckboxInput from './checkboxInput'

class ApplicationOptionalCheckbox extends Component {

    render() {
        const {
            placeholder,
            title,
            value,
            onChange,
            onRemove
        } = this.props

        return value ?
            <CheckboxInput label={title} isChecked={value} onChange={(event) => {
                const isCheckedNow = event.target.checked

                if (!isCheckedNow) onRemove({})
            }} value={value} /> :
            <OnboardingInput
                label={placeholder}
                textFieldSize={false}
                value={title}
                onKeyPress={(event) => {
                    const charCode = event.charCode

                    if (charCode === 13) {
                        event.preventDefault()

                        if (title && title.length > 0) {
                            onChange({
                                title,
                                value : true,
                                alternative : true,
                                items : false
                            }, { onEnter : true })
                        }
                    }
                }}
                onChange={(event) => {
                    const title = event.target.value

                    onChange({
                        title,
                        value : false,
                        alternative : true,
                        items : false
                    })
                }}
                onBlur={() => {
                    if (title && title.length > 0) {
                        onChange({
                            title,
                            value : true,
                            alternative : true,
                            items : false
                        }, { onBlur : true })
                    }
                }}
            />
    }

}

ApplicationOptionalCheckbox.propTypes = {
    placeholder : PropTypes.string,
    title : PropTypes.string,
    value : PropTypes.bool,
    onChange : PropTypes.func,
    onRemove : PropTypes.func
}
ApplicationOptionalCheckbox.defaultProps = {
    onChange : ({ eid, value, isChecked }) => {},
    onRemove : ({ eid }) => {}
}

export default ApplicationOptionalCheckbox
