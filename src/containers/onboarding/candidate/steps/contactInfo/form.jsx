import React, {Component} from 'react'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

import co from 'co';
import Button from './../../../../../components/main/button';
import {
    THIS_EMAIL_IS_ALREADY_REGISTERED,
} from './../../../../../constants/candidateOnboarding';
import {
    fetchByEmail as getCandidateByEmail,
} from './../../../../../sagas/candidateOnboarding';
import {
    saveContactInfoData,
    showIndustryStep,
} from './../../../../../actions/candidateOnboarding';


//Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

//Generalized Redux Field
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <div>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && (error && <span class="textfield__error">{error}</span>)}
    </div>
  </div>
)

//Props for AutoComplete Item (Special)
 const inputProps = {
    value: '', // `value` is required
    onChange: '', // `onChange` is required
    onBlur: () => {
      console.log('blur!')
    },
    type: 'search',
    placeholder: 'Current Employment Location',
    autoFocus: true,
  }
const cssClasses = {
	input: 'mdl-textfield__input textfield__input'
}

//Form
const OnboardingCandidateContactInfo = props => {
	const { handleSubmit, submitting } = props

		return (
				<form onSubmit={handleSubmit}>
						<fieldset className="form__row">
								<Field
										label="First Name"
										name="firstName"
										type="text"
										component={renderField}
										validate={required}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
										label="Last Name"
										name="lastName"
										type="text"
										component={renderField}
										validate={required}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
										label="Email"
										name="email"
										type="email"
										component={renderField}
										validate={[email,required]}
									/>
						</fieldset>
						<fieldset className="form__row">
							<PlacesAutocomplete
								inputProps={inputProps}
								classNames={cssClasses}/>

								<Field
									name="abilityToRelocate"
									id="abilityToRelocation"
									component="input"
									type="checkbox"
								/>
								<label>Willing to Relocate</label>
						</fieldset>
						<div className="form__actions">
								<Button
										type="submit"
										typeColored
										buttonSize="l"
										disabled={submitting}
								>
										Get Started
								</Button>
						</div>
				</form>
		);
}


/*
@reduxForm({
    form: 'onboardingCandidateContactInfo',
    alwaysAsyncValidate: true,
    asyncBlurFields: ['email'],
    asyncValidate: (values) => {
        const { email } = values;
        return co(function* () {
            return yield {
                * email() {
                    const error = {
                        email: THIS_EMAIL_IS_ALREADY_REGISTERED,
                    };
                    let candidate;

                    try {
                        candidate = yield getCandidateByEmail(email);
                    } catch (ex) {
                        throw error;
                    }

                    if (candidate.email === true) {
                        throw error;
                    }

                    if (candidate.length) {
                        throw error;
                    }

                    return {};
                },
            };
        });
    },
    onSubmit: (fields, dispatch) => {
        dispatch(saveContactInfoData(fields));
        dispatch(showIndustryStep());
    },
})*/
export default reduxForm({
	form: 'loginForm',
	onSubmit: (fields, dispatch) => {
		dispatch(saveContactInfoData(fields));
		dispatch(showIndustryStep());
	},
	onChange: () => {
		console.log("doing things!");
	}
	
})(OnboardingCandidateContactInfo)
