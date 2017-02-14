import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import ApplicationTextarea from './../../../../../components/main/textarea'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import {
    saveDescriptionData,
    cancelDescriptionStep
} from './../../../../../actions/applicationCompany'

@connect(
    function mapStateToProps(state, ownProps) {
        const { description } = state.applicationCompany

        return {
            initialValues : {
                description
            }
        }
    },

    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
@reduxForm({
    form : 'applicationCompanyDescription',
    fields : [
        'description'
    ],
    touchOnChange : true
})
class AddDescriptionForm extends Component {
    render() {
        const {
            fields : {
                description
            },
            handleSubmit,
            submitting,
            invalid,
            dispatch
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <DescriptionListItem>
                <Form class='form_indent-size_none' onSubmit={
                handleSubmit((fields, dispatch) => {
                    dispatch(saveDescriptionData({
                        ...fields
                    }))
                })}>
                    <ApplicationTextarea {...description}
                        label='Few words about your company'
                    />
                    <div class='form__actions'>
                        <Button
                            type='submit'
                            typeColored
                            disabled={isDisabledSubmit}
                        >
                            Add
                        </Button>
                        <a class='link' href='' onClick={(event) => {
                            event.preventDefault()
                            dispatch(cancelDescriptionStep())
                        }}
                        >
                            Cancel
                        </a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddDescriptionForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func
}

export default AddDescriptionForm
