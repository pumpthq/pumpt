import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import ApplicationTextarea from './../../../../../components/main/textarea'
import {
    saveQuoteOrMottoData,
    cancelQuoteOrMottoStep
} from './../../../../../actions/applicationCompany'

@connect(
    function mapStateToProps(state, ownProps) {
        const { quoteOrMotto } = state.applicationCompany

        return {
            initialValues : {
                quoteOrMotto
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
    form : 'applicationCompanyQuoteOrMotto',
    fields : [
        'quoteOrMotto'
    ],
    touchOnChange : true
})
class AddQuoteOrMottoForm extends Component {
    render() {
        const {
            fields : {
                quoteOrMotto
            },
            handleSubmit,
            submitting,
            invalid,
            dispatch
        } = this.props

        const isDisabledSubmit = invalid || submitting
        
        return (
            <DescriptionListItem>
                <Form onSubmit={
                    handleSubmit((fields, dispatch) => {
    
                        dispatch(saveQuoteOrMottoData({
                            ...fields
                        }))
                    })}>
                    <ApplicationTextarea {...quoteOrMotto}
                        label='Main idea of your company in one phrase'
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
                            dispatch(cancelQuoteOrMottoStep())
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

AddQuoteOrMottoForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func
}

AddQuoteOrMottoForm.defaultProps = {}

export default AddQuoteOrMottoForm
