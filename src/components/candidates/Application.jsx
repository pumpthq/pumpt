import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { reduxForm, FieldArray, Field, SubmissionError } from 'redux-form'

//Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField'

//Material Ui AutoComplete
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {
  AutoComplete,
  Checkbox,
} from 'redux-form-material-ui';

import GlassDoorImage from 'img/glassdoor.jpg'
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


//Field-level Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
/*export const twitterUrl = value =>
	value && /https:\/\/twitter.com\/
*/

//Form
let ApplicationForm = props =>  {
	const {handleSubmit, submitting, error, valid, dispatch} = props

		return (
			<form onSubmit={handleSubmit} class="candidate-application-form text-input-underlined"> 

					<CaseIcon/>
					<FieldArray name="workingExperiences" label="Working Experience" component={renderWorkingExperiences} />
					<CardDivider/>

					<Education/>
					<FieldArray name="education" component={renderEducations} />
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
							<Field
								name="location"
								component={PlaceField}
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

/*ApplicationForm = connect(
  state => ({
    initialValues: state.candidateOnboarding // pull previous values from onboarding state
  })
)(ApplicationForm)*/

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
									<div class="application-detail col-md-12">
										<Field
											name={`${workingExperience}.companyName`}
											type="text"
											component={renderField}
											label="Company Name"
										/>
									</div>
									<div class="application-detail col-md-6">
										<Field
											name={`${workingExperience}.position`}
											type="text"
											component={renderField}
											label="Title"
										/>
									</div>
									<div class="application-detail col-md-6">
										<Field
											name={`${workingExperience}.location`}
											component={PlaceField}
										 />
									</div>
									<div class="application-detail col-md-12">
										<Field
											name={`${workingExperience}.duty`}
											type="textarea"
											component={renderField}
											label="Description of your work"
										/>
									</div>
									<div class="application-detail col-md-3">
										<Field
											name={`${workingExperience}.startWorkingAt`}
											type="text"
											component={renderField}
											label="Start Date (MM/YYYY)"
										/>
									</div>
									<div class="application-detail col-md-3">
										<Field
											name={`${workingExperience}.endWorkingAt`}
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

const renderEducations = ({ fields, label, meta: { error } }) => (
	<div className="application-item">
			<button className="application-item-button" type="button" onClick={() => {
				fields.push()
			}}><i/>
			{fields.length === 0 && 'Add'} Education
			</button>
			{fields.map((education, index) => (
				<div key={index} className="info-block">
								<div class="row">
									<div class="application-detail col-md-12">
										<Field
											name={`${education}.schoolName`}
											type="text"
											component={renderField}
											label="School Name"
										/>
									</div>
									<div class="application-detail col-md-6">
										<Field
											name={`${education}.specialty`}
											type="text"
											component={renderField}
											label="Field of Study"
										/>
									</div>
									<div class="application-detail col-md-6">
										<Field
											name={`${education}.degree`}
											component={AutoComplete}
											floatingLabelText="Degree"
											openOnFocus
											filter={MUIAutoComplete.fuzzyFilter}
											dataSource={['High School','Undergraduate','Graduate','Other']}
											//FIXME: above is not being pulled from single source data in API
										/>
									</div>
									<div class="application-detail col-md-12">
										<Field
											name={`${education}.duty`}
											type="textarea"
											component={renderField}
											label="Description of your work"
										/>
									</div>
									<div class="application-detail col-md-3">
										<Field
											name={`${education}.startStudyAt`}
											type="text"
											component={renderField}
											label="Start Date (MM/YYYY)"
										/>
									</div>
									<div class="application-detail col-md-3">
										<Field
											name={`${education}.endStudyAt`}
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
const renderSkills = ({ showSkills, fields, meta: { error } }) => (
	<div className="application-item">
			<button className="application-item-button" type="button" onClick={() => {
				fields.push()
			}}><i/>
			{fields.length === 0 && 'Add'} Skills
			</button>

			{fields.length !== 0 &&

				<div className="info-block">
							<div class="row">
								<div class="application-detail col-md-12">
									<Field name="pepperoni" component={Checkbox} label="Pepperoni" />
								</div>
								<div class="application-detail col-md-12">
									<Field name="mushrooms" component={Checkbox} label="Mushrooms" />
								</div>
								<div class="application-detail col-md-12">
									<Field name="peppers" component={Checkbox} label="Peppers" />
								</div>
								{/*{fields.map((skill, index) => (
							))}*/}
						</div>
				</div>
			}
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



const EducationEntry = props => {
    const { field: { schoolName, specialty, degree, startStudyAt, endStudyAt } } = props
    return (
        <div class="row">
					<div class="col-md-12">
            <TextInput field={schoolName} placeholder="School Name" />
					</div>
					<div class="col-md-6">
            <TextInput field={specialty} placeholder="Field of Study" />
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
