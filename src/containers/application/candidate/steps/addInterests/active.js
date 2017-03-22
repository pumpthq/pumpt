import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from './../../../../../components/main/form'
import AddPhotoArea from '../../../../../components/application/candidate/AddPhotoArea'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import { getPhoto } from './../../../../../reducers/applicationPhotoUploading'

import {
    saveInterestsData,
    cancelInterestsStep
} from './../../../../../actions/applicationCandidate'

@connect(
    function mapStateToProps(state, ownProps) {
        const { interests } = state.applicationCandidate
        const fields = interests.map((element) => (Object.assign({}, element, {
            value : element.description
        })))

        return {
            fields,
            isInvalid : interests.filter((element) => {
                return getPhoto(state, { id : element.mediaId })
            }).pop ? false : true
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class AddInterestsForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fields : props.fields.map((field, index) => (Object.assign({}, field, {
                onChange : (event) => {
                    const { value } = event.target
                    const { fields } = this.state
                    const nextState = fields.map((inField, inIndex) => {
                        if (index === inIndex) {
                            return Object.assign({}, inField, {
                                value
                            })
                        }

                        return Object.assign({}, inField)
                    })

                    this.setState({
                        fields : nextState
                    })
                },
                getValue : () => {
                    return this.state.fields[index].value
                }
            })))
        }
    }

    render() {
        const {
            isInvalid,
            dispatch
        } = this.props
        const { fields } = this.state

        return (
            <DescriptionListItem>
                <Form class='form_indent-size_none' onSubmit={
                    (event) => {
                        const nextState = this.state.fields

                        event.preventDefault()
                        dispatch(saveInterestsData({
                            interests : nextState.map((element) => (Object.assign({}, {
                                mediaId : element.mediaId,
                                description : element.value
                            })))
                        }))
                    }
                }>
                    <div class="form-row">
                        <div class="swipe-container swipe-container_location_app">
                            <div class="swipe-container__inner">
                                {fields.map((field) => {
                                    return (
                                        <AddPhotoArea
                                            onChange={field.onChange}
                                            value={field.getValue()}
                                            mediaId={field.mediaId}
                                            description={field.description}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="form__actions">
                        <button
                            type="submit"
                            class="mdl-button button button_type_colored"
                            disabled={isInvalid}
                        >Add</button>
                        <a class="link" href="" onClick={(event) => {
                            event.preventDefault()
                            dispatch(cancelInterestsStep())
                        }}>Cancel</a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddInterestsForm.propTypes = {
    fields : PropTypes.arrayOf(PropTypes.shape({
        mediaId : PropTypes.string,
        description : PropTypes.string
    })),
    isInvalid : PropTypes.bool,
    invalid : PropTypes.bool,
    submitting : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func
}

export default AddInterestsForm
