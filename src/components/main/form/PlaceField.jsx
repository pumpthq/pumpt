import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form'

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
		placeholder : "Location",
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

