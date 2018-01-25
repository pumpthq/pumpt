import React from 'react';
import {Field, FieldArray, formValueSelector, reduxForm, SubmissionError} from 'redux-form'
//Places Autocomplete Library
import {PlaceField} from 'components/main/form/PlaceField'

import QuoteIcon from 'components/icons-application/quote'
import ChainIcon from 'components/icons-application/chain'
import Pin from 'components/icons-application/pin'
import Description from 'components/icons-application/description'
import Social from 'components/icons-application/social'

import LinkedInIcon from 'components/icons-application/linkedIn'
import TwitterIcon from 'components/icons-application/twitter'
import FacebookIcon from 'components/icons-application/facebook'
import './style.less'
//Actions
import {updateCompany} from 'actions/applicationCompany'
//Field-level Validations & Normalizations
import {require, url} from 'components/main/form/validations'
import {normalizeTwitter} from 'components/main/form/normalizations'
import {renderField} from 'components/form/helpers';
import {apiImage} from 'components/helpers'

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

//Form
let CompanyApplicationForm = props => {

	const { handleSubmit, submitting, error, invalid, valid, dispatch, names, values} = props
	const submitDisabled = invalid || submitting
	const submit = (values, dispatch) => {
		return dispatch(updateCompany(values))
			.catch(err => {
					throw new SubmissionError({
							_error: 'Error Saving Profile. Please correct any errors, try again, and let us know if the issue persists' 
					})
			})
	}

	return (
		<form onSubmit={handleSubmit(submit)} class="company-application-form text-input-underlined"> 
			<CardDivider/>

			<Social/>
			<FieldArray name="social" component={renderSocial} />
			<CardDivider/>

			<Pin/>
			<FieldArray name="locationOffices" component={renderOfficeLocations} />
			<CardDivider/>

			<Description/>
				<h2 className="recruiter-application-item">Description</h2>
					<Field name="description" component="textarea" class="text-area" placeholder="Tell us More About Your Company..." />
				<CardDivider/>

			<QuoteIcon/>
				<h2 className="recruiter-application-item">Quote Or Motto</h2>
					<Field name="quoteOrMotto" component="textarea" class="text-area" placeholder="Your Company's Motto..." />
				<CardDivider/>

			{/*	<FieldArray fields="images" label="Photos" component={renderImages} />*/}
				<CardDivider/>

			<div>
			{error && <span class="textfield__error">{error}</span>}
				<br/>
				<button type="submit" disabled={submitDisabled}
								className="mdl-button button invisible-mobile button_type_colored button_size_m company-submit"
				>
					{submitting ? <i/> : <i/>} Save
				</button>
				{/* <button type="button" disabled={submitting} onClick={resetForm}>
				 Clear Values
				 </button> */}
			</div>
		</form>
	)
}

const renderSocial = ({ fields, meta: { error } }) => (
	<div className="application-item">
			<button class="application-item-button">Social Media</button>

				<div className="info-block">
					<div class="row">
						<div className="social-media-block">
							<ChainIcon/>
							<Field
								name="socialMedia.websiteUrl"
								type="text"
								component={renderField}
								label="Website"
								className="social-application-item"
								validate={url}
							/>
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
								name="socialMedia.facebookUrl"
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

const renderOfficeLocations = ({ fields, label, meta: { error } }) => (
	<div className="application-item">
			<button className="application-item-button" type="button" onClick={() => {
				fields.push()
			}}><i/>
			Office Locations
			</button>
			<div class="row">
				<div class="col-md-12">
					<div class="application-detail">
						<Field
							name="headquartersLocation"
							component={PlaceField}
							label="Headquarters"
						 />
					 </div>
				 </div>
				 <div class="col-md-12">
					 <div class="row">
							{fields.map((officeLocation, index) => (
							<div key={index} class="col-md-6">
								<div className="info-block">
										<div class="application-detail">
											<Field
												name={`${officeLocation}.location`}
												component={PlaceField}
												label="Office Location"
											 />
												<button className="remove-entry" type="button" onClick={() => {
													fields.remove(index)
												}}><i>X</i>
												</button>
										</div>
								</div>
							</div>

							))}
							{error && <li className="error">{error}</li>}
						</div>
					</div>
				</div>

		 		<button className="add-entry mdl-button" type="button" onClick={() => {
					fields.push()
					}}>Add {fields.length === 0 && 'Office Location'}
				</button>
</div>
)

const renderImages = ({ fields, label, meta: { error } }) => (
	<div className="application-item">
			<button className="application-item-button" type="button" onClick={() => {
				fields.push()
			}}><i/>
			{fields.length === 0 && 'Add'} Image
			</button>
			{fields.map((image, index) => (
				<div key={index} className="info-block">
								<div class="row">
									<div class="application-detail col-md-12">
										<Field
											name={`${image}.image`}
											component={renderDropzoneInput}
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

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}


const ImageEntry = props => {
    const { field } = props
    return (
        <img src={apiImage(field.value)} className="image image_width_full"/>
    )
}


//Define Form
CompanyApplicationForm = reduxForm({
	form: 'companyApplicationForm',
	enableReinitialize : true
})(CompanyApplicationForm)

//Export Form
export default CompanyApplicationForm
