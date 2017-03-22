import React, { Component, PropTypes } from 'react'
import Form from './../../components/main/form'
import { OnboardingInput } from './../../components/onboarding'

class AlternativeInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cursor : true,
            data : '',
            isDisabled : true,
            isSelected : false
        }
    }

    render() {
        const self = this
        const { item, activeItem, onClick } = this.props
        const { isDisabled, data, cursor } = this.state
        const showDisabled = activeItem && item.id !== activeItem.id ? 'is-disabled' : ''

        return (
            <Form
                className='form form_indent-size_none form_inline form_type_link'
                onSubmit={(event) => {
                    event.preventDefault()
                    const selectedItem = {
                        id : item.id,
                        value : data,
                        parent : item.parent ? item.parent.id : null
                    }

                    onClick(selectedItem)
                }}
            >
                <OnboardingInput
                    style={{ cursor }}
                    label={data || item.title}
                    value={data}
                    additionalClass={showDisabled}
                    ref='input'
                    onChange={(event) => {
                        const { value } = event.target

                        if (value.length) {
                            self.setState({
                                cursor : false,
                                data : value,
                                isDisabled : false
                            })
                        } else {
                            self.setState({
                                cursor : true,
                                data : value,
                                isDisabled : true
                            })
                        }
                    }}
                    onFocus={function(event) {
                        const { value } = event.target

                        if (value.length > 0) {
                            this.dirtying(true)
                        }
                    }}
                    onBlur={function() {
                        this.dirtying(false)
                    }}
                />
                <button
                    type='submit'
                    class='mdl-button button button_type_transparent button_size_l'
                    disabled={isDisabled}
                >Next</button>
            </Form>
        )
    }
}

AlternativeInput.propTypes = {
    item : PropTypes.object,
    activeItem : PropTypes.object,
    onClick : PropTypes.func
}

export default AlternativeInput
