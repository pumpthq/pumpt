import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'

import {
    saveFoundationYearData,
    showWebsiteAndSocialMediaStep
} from './../../../../../actions/companyOnboarding'

const InputProps = {
    type : 'number',
    min : 1700,
    max : new Date().getFullYear()
}

@connect(
    function mapStateToProps(state, ownProps) {
        const { companyOnboarding } = state

        return {
            initialValues : {
                foundationYear : companyOnboarding.foundationYear
            }
        }
    }
)
@reduxForm({
    form : 'onboardingCandidateContactInfo',
    fields : [
        'foundationYear'
    ],
    touchOnChange : true,
    validate : (values) => {
        const errors = {}

        try {
            const intYear = parseInt(values.foundationYear)
            const minYear = InputProps.min
            const maxYear = InputProps.max

            if (intYear < minYear || intYear > maxYear) {
                throw new Error('Year is out of boundaries')
            }
						if (Number.isInteger(intYear)) {
                throw new Error('Not a Number')
            }
        } catch (ex) {
            errors.foundationYear = 'Invalid year'
        }

        return errors
    },
    onSubmit : (fields, dispatch) => {
        dispatch(saveFoundationYearData(fields))
        dispatch(showWebsiteAndSocialMediaStep())
    }
})
class FoundationYearForm extends Component {
    render() {
        const {
            fields : {
                foundationYear
            },
            handleSubmit,
            submitting,
            invalid
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <Form ref='innerForm' onSubmit={handleSubmit}>
                <OnboardingInput
                    label={'Year'}
                    {...InputProps}
                    {...foundationYear}
                    error={foundationYear.touched && foundationYear.error}
                    onBlur={function(event) {
                        const { value } = event.target

                         if (value.length > 0) {
                            this.dirtying(true)
                         }
                    }}
                />
                <div class='form__actions'>
                    <Button type='submit'
                            typeColored 
                            buttonSize='l'
                            disabled={isDisabledSubmit}
                    >
                        Next
                    </Button>
                </div>
            </Form>
        )
    }
}

FoundationYearForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func
}

export default FoundationYearForm
