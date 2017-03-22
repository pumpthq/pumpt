import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import deepCopy from 'deep-copy'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import CheckboxInput from './../../../../../components/application/input/checkboxInput'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import {
    saveSkillsData,
    cancelSkillsStep
} from './../../../../../actions/applicationCandidate'
import TypedCheckbox from './../../../../../components/application/input/typedCheckbox'
import OptionalCheckbox from './../../../../../components/application/input/optionalCheckbox'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            skills
        } = state.applicationCandidate

        return {
            items : skills
        }
    },

    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class AddSkillsForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items : []
        }
    }

    componentWillMount() {
        const { items } = this.props

        this.setState({
            items : deepCopy(items)
        })
    }

    render() {
        const {
            dispatch,
            onChange,
            onRemove
        } = this.props
        const { items } = this.state
        // const isSubmitDisabled = items.findIndex((item) => (item.value)) < 0

        return (
            <DescriptionListItem>
                <Form class='form_type_checkbox container-fluid' onSubmit={(event) => {
                    event.preventDefault()
                    if (items.filter((item) => item.value == true).length <= 0) {
                        return dispatch(cancelSkillsStep({
                            skills : items,
                            replace : true
                        }))
                    }
                    dispatch(saveSkillsData({
                        skills : items
                    }))
                }}>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            {items.map((item, index) => {
                                if (!item.alternative && !item.items) {
                                    return (
                                        <fieldset key={index} class="row form__row">
                                            <CheckboxInput
                                                label={item.title}
                                                isChecked={item.value}
                                                onChange={(event) => {
                                                    const isChecked = event.target.checked

                                                    onChange({
                                                        setState : this.setState.bind(this),
                                                        items,
                                                        index,
                                                        newState : {
                                                            title : item.title,
                                                            value : isChecked,
                                                            alternative : false,
                                                            items : false
                                                        }
                                                    })
                                                }}
                                                value={item.value}
                                            />
                                        </fieldset>
                                    )
                                }

                                return (null)
                            })}
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            {items.map((item, index) => {
                                if (item.alternative && item.items) {
                                    return (
                                        <TypedCheckbox
                                            key={index}
                                            {...item}
                                            onChange={(newState) => {
                                            onChange({
                                                setState : this.setState.bind(this),
                                                items,
                                                index,
                                                newState : {
                                                   ...newState,
                                                   placeholder : item.placeholder
                                                }
                                            })
                                            }}
                                        />
                                    )
                                }

                                return (null)
                            })}
                        </div>
                    </div>
                    <div class="row">
                        {items.map((item, index) => {
                            if (item.alternative && !item.items) {
                                return (
                                    <div key={index} class="col-lg-6 col-xs-12">
                                        <fieldset class="row form__row">
                                            <OptionalCheckbox
                                                placeholder={item.placeholder}
                                                title={item.title}
                                                value={item.value}
                                                onChange={(newState, options) => {
                                                    const patch = {
                                                        setState : this.setState.bind(this),
                                                        items,
                                                        index,
                                                        newState : {
                                                            ...newState,
                                                            placeholder : item.placeholder,
                                                        }
                                                    }

                                                    if (options) {
                                                        const isAlternativeExist = items.findIndex((item) => {
                                                            return !item.title && !item.value &&
                                                                item.alternative && !item.items
                                                        })
                                                        const newItems = [
                                                            ...items
                                                        ]

                                                        if (isAlternativeExist) newItems.push({
                                                            placeholder : 'Other',
                                                            alternative : true
                                                        })

                                                        return onChange({
                                                            ...patch,
                                                            items : newItems
                                                        })
                                                    }

                                                    onChange(patch)
                                                }}
                                                onRemove={() => {
                                                    onRemove({
                                                        setState : this.setState.bind(this),
                                                        items,
                                                        index
                                                    })
                                                }}
                                            />
                                        </fieldset>
                                    </div>
                                )
                            }

                            return (null)
                        })}
                    </div>
                    <div class="row form__actions form__actions_indent-size_s">
                        <Button type='submit' typeColored>Add</Button>
                        <a class="link" href="" onClick={(event) => {
                            event.preventDefault()
                            dispatch(cancelSkillsStep({}))
                        }}>Cancel</a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddSkillsForm.propTypes = {
    dispatch : PropTypes.func,
    items : PropTypes.arrayOf(PropTypes.shape({
        title : PropTypes.string.isRequired,
        placeholder : PropTypes.string,
        value : PropTypes.bool,
        alternative : PropTypes.bool,
        items : PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.arrayOf(PropTypes.shape({
                title : PropTypes.string,
                value : PropTypes.string,
                isFocused : PropTypes.bool
            }))
        ])
    })),
    onChange : PropTypes.func.isRequired,
    onRemove : PropTypes.func.isRequired
}

AddSkillsForm.defaultProps = {
    onChange : ({ setState, items, index, newState }) => {
        setState({
            items : items.map((inItem, inIndex) => {
                if (index === inIndex) {
                    return newState
                }

                return Object.assign({}, inItem)
            })
        })
    },
    onRemove : function({ setState, items, index }) {
        setState({
            items : items.filter((inItem, inIndex) => {
                return index !== inIndex
            })
        })
    }
}

export default AddSkillsForm
