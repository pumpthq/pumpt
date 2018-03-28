import React from 'react'
import {Field, reduxForm, SubmissionError} from 'redux-form'
//Places Autocomplete Library
import PlacesAutocomplete from 'react-places-autocomplete'


//WIP/TODO: DRY UP THIS AND ALL ASYNC VALIDATIONS,FIELD VALIDATIONS, + FORM FIELDS
//Places Autocomplete Field
const AutocompleteItem = ({ formattedSuggestion }) => (
	<div>
		<strong>{ formattedSuggestion.mainText }</strong>{' '}
		<small>{ formattedSuggestion.secondaryText }</small>
	</div>
)

export const PlaceField = ({ values, name, input, onChange, label, meta: { touched, error }, ...rest }) => {
	const hasError = touched && error;
	const id = input.name;

	const classes={
		input: `form-control form-control-lg${hasError ? ' form-control-danger' : ''}`
	}

	//restrict to city results only, in US and territories
	const options = {
		types: ['(cities)'],
    componentRestrictions: {country: ["US","PR","VI","GU","MP"]} 
	}

	const inputProps = {
		value : input.value,
    onChange : input.onChange,
		onBlur: input.onBlur,
		id : id,
		placeholder : label,
		name : name,
	}

	return (
		<div className={`form-group${hasError ? ' has-danger' : ''}`}>

			<PlacesAutocomplete
				inputProps={inputProps}
				options={options}
			/>

			{hasError && <div className="textfield__error textfield__error_small">{error}</div>}
		</div>
	);
}
