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
