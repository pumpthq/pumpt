//Form Components + Redux
import React, {Component} from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form'
//import { Form, renderField, PlaceField } from 'components/main/form';
import { Form  } from 'components/main/form';

//General Components
import Button from './../../../../../components/main/button';

//Places Autocomplete Library
import PlacesAutocomplete from 'react-places-autocomplete'

//import ExperiencedInputDropdown from '../../../../../components/parts/experiencedInputDropdown';
//import LocationFilter from './../../../../../components/parts/locationFilter';

//Actions
import {
    saveHeadquatersLocationStep,
    showNumberOfEmployeesStep,
} from './../../../../../actions/companyOnboarding';

//Field Validations
const required = value => (value ? undefined : 'Can\'t be Blank')

//Generalized Redux Field
export const renderField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

//Places Autocomplete Field
const AutocompleteItem = ({ formattedSuggestion }) => (
	<div>
		<strong>{ formattedSuggestion.mainText }</strong>{' '}
		<small>{ formattedSuggestion.secondaryText }</small>
	</div>
)

export const PlaceField = ({ values, input, onChange, label, meta: { touched, error }, ...rest }) => {
	const hasError = touched && error;
	const id = input.name;

	const classes={
		input: `form-control form-control-lg${hasError ? ' form-control-danger' : ''}`
	}

	//restrict to city results only
	const options = {
		types: ['(cities)']
		//componentRestrictions: new google.maps.ComponentRestrictions('country:us|country:pr|country:vi|country:gu|country:mp')
	}

	//WIP: restrict results to US only (US already prioritizes, but not exlusive)
	//Trying to configure using [https://github.com/kenny-hibino/react-places-autocomplete, https://developers.google.com/maps/documentation/javascript/reference#AutocompletionRequest]


	const inputProps = {
		value : input.value,
		onChange : input.onChange,
		id : id,
		typeAhead : false,
		inputName : input.name,
		autocompleteItem : AutocompleteItem,
		classNames : classes,
	}

	return (
		<div className={`form-group${hasError ? ' has-danger' : ''}`}>
			<label className="form-control-label" htmlFor={id}>{label}</label>

			<PlacesAutocomplete
				inputProps={inputProps}
				options={options}
			/>

			{hasError && <div className="form-control-feedback">{error}</div>}
		</div>
	);
}


//Company Onboarding Location Info Form
let LocationInfoForm = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || asyncValidating || error

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveHeadquatersLocationStep(values))
			dispatch(showNumberOfEmployeesStep())
		}

        return (
					<form onSubmit={handleSubmit(submit)}>
							<div class="row">
									<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
											<fieldset class="form__row">
											<Field
												name="location"
												component={PlaceField}
											 />
											</fieldset>
									</div>
									<div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
											<fieldset class="form__row">
											</fieldset>
									</div>
							</div>
							<div class="form__actions">
									<Button
											type="submit" typeColored buttonSize="l"
											disabled={submitDisabled}
									>
											Next
									</Button>
							</div>
					</form>
		)
	}


//Form Export
LocationInfoForm = reduxForm({
	form: 'locationInfoForm'
})(LocationInfoForm)


LocationInfoForm = connect(
  state => ({
    initialValues: state.candidateOnboarding // pull previous values from onboarding state
  })
)(LocationInfoForm)

export default LocationInfoForm
