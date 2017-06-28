import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import PlacesAutocomplete from 'react-places-autocomplete'

import GlassDoorImage from 'img/glassdoor.jpg'
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form'
import { tintedBackground } from 'components/helpers'
import { browserHistory } from 'react-router'
import { Location, EnumSelector, TextArea, TextInput, DateInput } from 'components/form/inputs'
import ExperiencedInputDropdown from '../../components/parts/experiencedInputDropdown';
import LocationFilter from '../../components/parts/locationFilter';
import { OnboardingInput } from '../../components/onboarding';
import {
    EMPLOYEMENTS_DROPDOWN_DATA,
    DEGREES_DROPDOWN_DATA,
} from 'constants/companyJobs';
import STATES from 'constants/states.json';
import PencilIcon from 'components/icons/pencil'
import Skills from 'components/icons-application/skills'
import CaseIcon from 'components/icons-application/case'
import Education from 'components/icons-application/education'
import Heart from 'components/icons-application/heart'
import Pin from 'components/icons-application/pin'
import Social from 'components/icons-application/social'
import LinkedInIcon from 'components/icons-application/linkedIn'
import TwitterIcon from 'components/icons-application/twitter'
import FacebookIcon from 'components/icons-application/facebook'
import './style.less'

//const stateMap = Object.keys(STATES).map(id=> ({id,title:STATES[id]}))

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

//Places Autocomplete Field
const AutocompleteItem = ({ formattedSuggestion }) => (
	<div>
		<strong>{ formattedSuggestion.mainText }</strong>{' '}
		<small>{ formattedSuggestion.secondaryText }</small>
	</div>
)

export const PlaceField = ({ values, input, label, meta: { touched, error }, ...rest }) => {
	const hasError = touched && error;
	const id = input.name;

	const classes={
		input: `form-control form-control-lg${hasError ? ' form-control-danger' : ''}`
	}

	/*const inputProps = {
		value: locationValue, // `value` is required
		onChange : (locationValue) => {update},
		onBlur: () => {
			console.log('blur!')
		},
		type: 'search',
		placeholder: 'Search Places...',
		autoFocus: true,
	}*/

	const inputProps = {
		id : id,
		typeAhead : false,
		inputName : input.name,
		autocompleteItem : AutocompleteItem,
		classNames : classes
	}

	return (
		<div className={`form-group${hasError ? ' has-danger' : ''}`}>
			<label className="form-control-label" htmlFor={id}>{label}</label>
			<PlacesAutocomplete
				inputProps={inputProps}/>
			{hasError && <div className="form-control-feedback">{error}</div>}
		</div>
	);
}

//Field-level Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
/*export const twitterUrl = value =>
	value && /https:\/\/twitter.com\/
*/

//Form
let ApplicationForm = props =>  {
	const {handleSubmit, submitting, error, valid, dispatch, locationValue } = props

		return (
			<form onSubmit={handleSubmit} class="candidate-application-form text-input-underlined"> 

					<CaseIcon/>
					<FieldArray name="workingExperiences" label="Working Experience" component={renderWorkingExperiences} />
					<CardDivider/>

					<Education/>
					<FieldArray name="education" component={renderEducation} />
					<CardDivider/>

					<Skills/>
					<FieldArray name="skills" component={renderSkills} />

					<Social/>
					<h2 className="social-application-item">Add Social Media</h2>

					<div className="social-media-block">
						<LinkedInIcon />
						{/*<TextInput field={socialMedia.linkedInUrl} label="LinkedIn" classItm="label-item-social" />*/}
						<Field
							name="linkedIn"
							type="text"
							component={renderField}
							label="LinkedIn"
							validate={[required]}
						/>

						<TwitterIcon />
						<Field
							name="twitter"
							type="text"
							component={renderField}
							label="Twitter"
						/>

						<FacebookIcon />
						<Field
							name="facebook"
							type="text"
							component={renderField}
							label="Facebook"
						/>
					</div>
					<CardDivider/>

				<div>
					<button type="submit" disabled={submitting}
					className="mdl-button button invisible-mobile button_type_colored button_size_m candidate-submit">
						{submitting ? <i/> : <i/>} Save Progress
					</button>
				</div>
			</form>

		)
	}

//Define Form
ApplicationForm = reduxForm({
	form: 'candidateApplication'
})(ApplicationForm)

// Decorate with connect to read form values
const selector = formValueSelector('candidateApplication')
ApplicationForm = connect(state => {

	const locationValue = selector(state, 'location')

  return {
    locationValue
  }
})(ApplicationForm)

//Export Form
export default ApplicationForm







//FieldArray Definitions
const renderWorkingExperiences = ({ fields, label, meta: { error } }) => (


	<div className="application-item">
			<button className="application-item-button" type="button" onClick={() => {
				fields.push()
			}}><i/>
			{fields.length === 0 && 'Add'} Working Experience
			</button>
			{fields.map((workingExperience, index) => (
				<div key={index} className="info-block">
								<div class="row">
									<div class="col-md-12">
										<Field
											name="companyName"
											type="text"
											component={renderField}
											label="Company Name"
										/>
									</div>
									<div class="col-md-6">
										<Field
											name="position"
											type="text"
											component={renderField}
											label="Title"
										/>
									</div>
									<div class="col-md-3">
										<Field
											name="location"
											component={PlaceField}
										 />
									</div>
									<div class="col-md-3">
										<Field
											name="state"
											type="text"
											component={renderField}
											label="State"
										/>
									</div>
									<div class="col-md-12">
										<Field
											name="duty"
											type="textarea"
											component={renderField}
											label="Description of your work"
										/>
									</div>
									<div class="col-md-3">
										<Field
											name="startWorkingAt"
											type="text"
											component={renderField}
											label="Start Date (MM/YYYY)"
										/>
									</div>
									<div class="col-md-3">
										<Field
											name="endWorkingAt"
											type="text"
											component={renderField}
											label="End Date (MM/YYYY)"
										/>
									</div>
								</div>

					<button className="remove-entry" type="button" onClick={() => {
						fields.remove(index)
					}}><i>Remove</i>
					</button>
				</div>

			))}
			{error && <li className="error">{error}</li>}

		{fields.length > 0 && <button className="add-entry mdl-button" type="button" onClick={() => {
				fields.push()
			}}>Add
		</button>}
</div>
)

const renderEducation = ({ fields, label, meta: { error } }) => (
	<div className="application-item">
		{fields.length === 0 && 'Add'} {label}
		<ul>
			<li>
				<button type="button" onClick={() => fields.push()}>Add Education</button>
			</li>
			{fields.map((education, index) => (
				<li key={index}>
					<button
						type="button"
						title="Remove Hobby"
						onClick={() => fields.remove(index)}
					/>
					<Field
						name={education}
						type="text"
						component={renderField}
						label={`EDU #${index + 1}`}
					/>
				</li>
			))}
			{error && <li className="error">{error}</li>}
		</ul>
</div>
)

const renderSkills = ({ fields, meta: { error } }) => (
	<div className="application-item">
		<ul>
			<li>
				<button type="button" onClick={() => fields.push()}>Add Skills</button>
			</li>
			{fields.map((skill, index) => (
				<li key={index}>
					<button
						type="button"
						title="Remove Skill"
						onClick={() => fields.remove(index)}
					/>
					<Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
					 <label htmlFor="employed">MS Office (Word, Excel, PPt)</label>
				</li>
			))}
			{error && <li className="error">{error}</li>}
		</ul>
</div>
)


//---------------------------------------------------------------------------------------------------------------------------------
//ARCHIVE
const FFieldArray = (props) => {
    const { field, label } = props
    const Item = props.component
    return (
        <div className="application-item">
            <button className="application-item-button" type="button" onClick={() => {
              field.addField()    // pushes empty child field onto the end of the array
            }}><i/>
						{field.length === 0 && 'Add'} {label}
            </button>
						{field.length > 0 && label !== "Skills"  && <p class="application-item-subtitle">Please add in chronological order</p>}

            {field.map((child, index) =>
                <div key={index} className="info-block">
                    <button className="remove-entry" type="button" onClick={() => {
                      field.removeField(index)  // remove from index
                    }}><i>Remove</i>
                    </button>
                </div>
            )}

					{field.length > 0 && <button className="add-entry mdl-button" type="button" onClick={() => {
							field.addField()    // pushes empty child field onto the end of the array
						}}>Add
					</button>}
        </div>
    )
}

import ImageUploader from 'components/ImageUploader'
import {FileImage} from 'components/icons'

export const UploadArray = (props) => {
    const { field, label } = props
    const Item = props.component
    return (
        <div className="application-item">
            <ImageUploader
                label="Add Interest"
                onSuccessAction={(data) => {
                    field.addField({image:data.id,description:''}); // ⚠️ this is a hack to work around for building an action for the reducer!
                    return {type:"FAKE_ACTION_HACK_FOR_ADDING_IMAGE_TO_FIELD_ARRAY"}

                    //🌟 below is correct way, to build and return the action dispatched by `field.addField(data.id)`
                    // return {
                    //     type: "redux-form/ADD_ARRAY_VALUE",
                    //     path: "interests",
                    //     value: {
                    //         image: data.id,
                    //         description: ""
                    //     },
                    //     fields: ["","image","description"],
                    //     form: "candidate-application"
                    // }


                }}
            />
            {field.map((child, index) =>
                <div key={index}>
                    <Item field={child} />
                    <button type="button" onClick={() => {
                      field.removeField(index)  // remove from index
                    }}><i>Remove</i>
                    </button>
                </div>
            )}
        </div>
    )
}

import {apiImage} from 'components/helpers'

const InterestEntry = props => {
    const { field: { image, description } } = props
    return (
        <div className="application-item interest-application-item">
					<div class="row">

            <TextInput field={description} placeholder="Description" />
            <img src={apiImage(image.value)} className="image image_width_full"/>
					</div>
        </div>
    )
}

const ExperienceEntry = props => {
    const { field: { companyName, position, city, state, duty, isCurrentJob, startWorkingAt, endWorkingAt } } = props
    return (
        <div class="row">
					<div class="col-md-12">
            <TextInput field={companyName} placeholder="Company Name" />
					</div>
					<div class="col-md-6">
            <TextInput field={position} placeholder="Title" />
					</div>
					<div class="col-md-3">
            <TextInput field={city} placeholder="City" />
					</div>
					<div class="col-md-3">
            <TextInput field={state} placeholder="State" />
					</div>
					<div class="col-md-12">
            <TextArea field={duty} inputClass="text-area" placeholder="Description of your work" readOnly="false"/>
					</div>
					<div class="col-md-3">
            <TextInput field={startWorkingAt} placeholder="Start Date (MM/YYYY)" />
					</div>
					<div class="col-md-3">
            <TextInput field={endWorkingAt} placeholder="End Date *MM/YYYY)" />
					</div>
        </div>
    )
}



const EducationEntry = props => {
    const { field: { schoolName, speciality, degree, startStudyAt, endStudyAt } } = props
    return (
        <div class="row">
					<div class="col-md-12">
            <TextInput field={schoolName} placeholder="School Name" />
					</div>
					<div class="col-md-6">
            <TextInput field={speciality} placeholder="Field of Study" />
					</div>
					<div class="col-md-6">
            <EnumSelector field={degree} label="Degree" options={DEGREES_DROPDOWN_DATA} />
					</div>
					<div class="col-md-3">
            <TextInput field={startStudyAt} placeholder="Start Date (MM/YYYY)" />
					</div>
					<div class="col-md-3">
            <TextInput field={endStudyAt} placeholder="End Date (MM/YYYY)" />
					</div>
        </div>
    )
}


const SkillEntry = props => {
	const { field: { title, value, alternative } } = props
	return (
			<div class="row skill-application-item">
				<div class="col-md-12 skill-application-item-input">
					<TextInput field={title} placeholder="Skill" />
				</div>
			</div>
		)
}



const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)
