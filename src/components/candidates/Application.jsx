import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { reduxForm, FieldArray, Field, SubmissionError, formValueSelector} from 'redux-form'

//Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField'

//Material Ui AutoComplete
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {
  AutoComplete,
  Checkbox,
	SelectField,
	MenuItem,
} from 'redux-form-material-ui';

//Actions
import { updateCandidate } from 'actions/candidateMatches'

//Field-level Validations & Normalizations
import { url, date, require } from 'components/main/form/validations'
import { normalizeDate, normalizeYear, normalizeTwitter } from 'components/main/form/normalizations'

import GlassDoorImage from 'img/glassdoor.jpg'
import { browserHistory } from 'react-router'
import { EMPLOYEMENTS_DROPDOWN_DATA, DEGREES_DROPDOWN_DATA } from 'constants/companyJobs';
import { SKILLS } from 'constants/candidateOnboarding';
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

import BasicDialog from 'components/main/popup/BasicDialog';

//Generalized Redux Field
export const renderField = ({
  input,
  label,
  type,
	className,
  meta: { asyncValidating, touched, error }
}) => (
  <div class={className}>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

//Form
let CandidateApplicationForm = props =>  {
	const { handleSubmit, submitting, error, invalid, valid, dispatch, names, values} = props
	const submitDisabled = invalid || submitting
	const submit = (values) => {
		return dispatch(updateCandidate(values))
			.catch(err => {
					throw new SubmissionError({
							_error: 'Error Occured While Trying to Save Your Profile'
					})
			})
	}

		return (
			<form onSubmit={handleSubmit(submit)} class="candidate-application-form text-input-underlined">

					<CaseIcon/>
					<FieldArray name="workingExperience" label="Working Experience" component={renderWorkingExperiences} />
					<CardDivider/>

					<Education/>
					<FieldArray name="education" component={renderEducations} />
					<CardDivider/>

					<Skills/>
					<FieldArray name="skills" component={renderSkills} />
					<CardDivider/>

					<Social/>
					<FieldArray name="social" component={renderSocial} />
					<CardDivider/>

				<div>
					<button type="submit" disabled={submitDisabled}
					className="mdl-button button button_type_colored button_size_m candidate-submit">
						 Save Progress
					</button>
          <BasicDialog trigger={submitting} onClose={browserHistory.goBack}>
            Your application has been saved
          </BasicDialog>
				</div>
			</form>
		)
	}

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
											label="Company Location"
										 />
									</div>
									<div class="application-detail col-md-12">
										<Field
											name={`${workingExperience}.duty`}
											component="textarea"
											class="text-area"
											placeholder="Description of your work"
										/>
									</div>
									<div class="application-detail col-md-4 col-sm-6">
										<Field
											name={`${workingExperience}.startWorkingAt`}
											type="text"
											component={renderField}
											label="Start Date (MM/YYYY)"
											normalize={normalizeDate}
											validate={date}
										/>
									</div>
									<div class="application-detail col-md-4 col-sm-6">
										<Field
											name={`${workingExperience}.endWorkingAt`}
											type="text"
											component={renderField}
											label="End Date (MM/YYYY)"
											normalize={normalizeDate}
											validate={date}
										/>
										<Field name={`${workingExperience}.isCurrentJob`} id={`${workingExperience}.currentEducation`} component={Checkbox} label="Currently Work Here"/>
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
										<Field label="Degree" class="mdl-textfield__input textfield__input pad-top-30" name={`${education}.degree`} component="select">
											<option value="" class="disabled-text-option" disabled selected>Degree</option>
											<option value="high-school">High School</option>
											<option value="undergraduate">Undergraduate</option>
											<option value="graduate">Graduate</option>
											<option value="other">Other</option>
										</Field>
									{/*FIXME: Not pulling data from enums/api - need to make this dynamic*/}
									</div>
									<div class="application-detail col-md-12">
										<div class="row">

											<div class="application-detail col-md-4 col-sm-6">
												<Field
													name={`${education}.startStudyAt`}
													component={renderField}
													type="text"
													label="Start Date (YYYY)"
													normalize={normalizeYear}
												/>
											</div>
											<div class="application-detail col-md-4 col-sm-6">
												<Field
													name={`${education}.endStudyAt`}
													type="text"
													component={renderField}
													label="End Date (YYYY)"
													normalize={normalizeYear}
												/>
												<Field name={`${education}.isCurrentSchool`} id={`${education}.currentEducation`} component={Checkbox} label="Currently Attending"/>
											</div>
										</div>
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

const renderSkills = ({ fields, meta: { error } }) => (
	<div className="application-item">
			<button className="application-item-button" type="button">Skills</button>
      {SKILLS.map((skill,index) =>
        <div class="application-detail checkbox-item col-md-12">
  				<Field name={`skills[${index}].value`} id={`skills[${index}].value`} component={Checkbox} label={skill}/>
  			</div>
      )}
		</div>
)


const renderSocial = ({ fields, meta: { error } }) => (
	<div className="application-item">
			<button className="application-item-button" type="button" onClick={() => {
			}}><i/>
			Social Media
			</button>
				<div className="info-block">
					<div class="row">
						<div className="social-media-block">
							<LinkedInIcon />
							<Field
								name="socialMedia.linkedInUrl"
								type="text"
								component={renderField}
								label="LinkedIn"
								className="social-application-item"
								validate={url}
							/>
							<TwitterIcon />
							<Field
								name="socialMedia.twitterAcc"
								type="text"
								className="social-application-item"
								component={renderField}
								normalize={normalizeTwitter}
								label="Twitter"
							/>
							<FacebookIcon />
							<Field
								name="socialMedia.faceBookUrl"
								type="text"
								component={renderField}
								className="social-application-item"
								label="Facebook"
								validate={url}
							/>
						</div>
					</div>
				</div>
</div>
)

//Define Form
CandidateApplicationForm = reduxForm({
	form: 'candidateApplication',
	enableReinitialize : true
})(CandidateApplicationForm)

const selector = formValueSelector('candidateApplicationForm')

CandidateApplicationForm = connect(
		state => {
			initialValues: state.candidateMatches.candidate
		}
)(CandidateApplicationForm)

//Export Form
export default CandidateApplicationForm
