import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { reduxForm, FieldArray, Field, SubmissionError} from 'redux-form'

//Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField'

//ACtions
import { createJob } from 'actions/companyJobs'

import { browserHistory } from 'react-router'
import {
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
} from 'constants/candidateOnboarding';
import {
    DEGREES_DROPDOWN_DATA,
    EMPLOYEMENTS_DROPDOWN_DATA,
} from 'constants/companyJobs';
import { find } from 'lodash'
import { TextArea } from 'components/form/inputs'

//Field-level Validations & Normalizations
import { url, date, required } from 'components/main/form/validations'


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
      {touched && error && <span class="textfield__error textfield__error_small">{error}</span>}
    </div>
  </div>
)


const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <select {...input} class="mdl-textfield__input textfield__input textfield__light">
				<option value="" class="disabled-text-option" disabled selected>{label}</option>
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
)


//Data
//WIP/FIXME: API Constants need to be normalized to work with both old and new versions of Redux-form
//API currently sends over old version, we define for the new version here
{/*import {
} from 'constants/candidateOnboarding';*/}


const industryData = [
  {name:'Ad Tech', value:'ad-tech'},
  {name:'Digital Media', value:'digital-media'},
  {name:'Digital Platform', value:'digital-platform'},
  {name:'Integrated Publisher', value:'integrated-publisher'},
  {name:'Other', value:'other'},
]

const jobTitleData = [
	{name:'Coordinator',			value:'coordinator'},
	{name:'Planner',					value:'planned'},
	{name:'Account Manager',	value:'account-manager'},
	{name:'Account Executive',value:'account-executive'},
	{name:'Director',					value:'director'},
	{name:'VP',								value:'vp'},
	{name:'SVP',							value:'svp'},
	{name:'CRO',							value:'cro'},
	{name:'Other',						value:'other'},
]

const workingAreaData = [
	{name:'Sales', value:'sales'},
	{name:'Business Development', value:'business-development'},
	{name:'Ad Operations', value:'ad-operations'},
	{name:'Account Management', value:'account-management'},
	{name:'Marketing / Creative', value:'marketing/creative'},
]

const specialtyData = [
'Sales': [
{name:	'Ad Tech/Platform',	value:'ad-tech/platform'},
{name:  'Digital Media',		value:'digital-media'},
{name:  'Programmatic',			value:'programmatic'},
{name:  'SaaS/Enterprise',	value:'saas/enterprise'},
{name: 	'Other',						value:'other'}
    ],
'Business Development': [
{name:	'Ad Tech/Platform',	value:'ad-tech/platform'},
{name:  'Digital Media',		value:'digital-media'},
{name:  'Programmatic',			value:'programmatic'},
{name:  'SaaS/Enterprise',	value:'saas/enterprise'},
{name: 	'Other',						value:'other'}
    ],
'Ad Operations': [
{name:	'Inventory Management',	value:'inventory-management'},
{name:  'Yield/Pricing',				value:'yield/pricing'},
{name:  'Campaign Trafficking',	value:'campaign-trafficking'},
{name: 	'Other',								value:'other'}
    ],
'Account Management': [
{name:	'Digital',				value:'digital'},
{name:  'Integrated',			value:'integrated'},
{name: 	'Other',					value:'other'}
    ],
'Marketing / Creative': [
{name:	'Digital',				value:'digital'},
{name:  'Integrated',			value:'integrated'},
{name: 	'Other',					value:'other'}
    ],
]

const annualIncomeData = [
  {name:'<$100K', 		 value:'<$100K'},
	{name:'$100K-$149K', value:'$100K-$149K'},
	{name:'$150K-$199K', value:'$150K-$199K'},
	{name:'$200K-$299K', value:'$200K-$299K'},
	{name:'$300K-$399K', value:'$300K-$399K'},
	{name:'$400K-$499K', value:'$400K-$499K'},
	{name:'$500K+', 		 value:'$499K+'},

]
const experienceData = [
  {name:'0-2 years',		value:'gt0lt2'},
  {name:'3-5 years',		value:'gt2lt5'},
  {name:'6-10 years',		value:'gt5lt10'},
  {name:'11-15 years',		value:'gt10lt15'},
  {name:'16+ years',		value:'gt15'},
]

let JobForm = props => { 
	const {handleSubmit, submitting, touched, error, invalid, valid, dispatch, names, values} = props
	const submitDisabled = invalid || submitting

	const submit = (values, dispatch) => {
		dispatch(createJob(values))
	}

		return (
		<div>
			<a class="button_type_close" onClick={browserHistory.goBack}>×</a>
        <div className="recruter__newjob-card">
					<form onSubmit={handleSubmit(submit)} class="mdl-card card card_state_open card_state_scroll">
            <div className="recruter__newjob-card__form-top">
              <div>
                <label>Title</label>
                <div>
										<Field
											name="title"
											type="text"
											component={renderField}
											label="Enter Job Title"
											validate={required}/>
                </div>
              </div>
              <div>
                <label>Location</label>
                <div>
									<Field
										name="location"
										component={PlaceField}
										validate={required}
									 />
								</div>
              </div>

								<Field name="salary" component={renderSelectField} label="Income" class="mdl-textfield__input textfield__input textfield__light">
									{ annualIncomeData.map(item => <option value={item.value}>{item.name}</option>) }
								</Field>

								<Field name="experience" component={renderSelectField} label="Industry Experience" class="mdl-textfield__input textfield__input textfield__light">
									{ experienceData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>

								<Field label="Degree" validate={required} class="mdl-textfield__input textfield__input textfield__light" name="degree" component="select">
									<option value="" class="disabled-text-option" disabled selected>Degree</option>
									<option value="high-school">High School</option>
									<option value="undergraduate">Undergraduate</option>
									<option value="graduate">Graduate</option>
									<option value="other">Other</option>
								</Field>


								{/*<EnumSelector field={employment} label="Employment" options={EMPLOYEMENTS_DROPDOWN_DATA} />*/}

								<Field name="workingAreaParent" component={renderSelectField} label="Working Area" class="mdl-textfield__input textfield__input textfield__light">
									{ workingAreaData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>

								<Field name="workingArea" component={renderSelectField} label="Specialty" class="mdl-textfield__input textfield__input textfield__light">
									{ specialtyData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>

								<Field name="industry" component={renderSelectField} label="Industry" class="mdl-textfield__input textfield__input textfield__light">
									{ industryData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>

              <div>
                <button className="new-job-submit-save" type="submit" disabled={submitting}>
                  {submitting ? <i/> : <i/>} Save Job Summary
                </button>
              </div>
            </div>

            <div className="recruter__newjob-card__form-bottom">

							<FieldArray name="description" label="Description" 					placeholder="Description of the Position..." component={renderDescription} />
							<FieldArray name="responsibilities" label="Responsibility" 	placeholder="Responsibility" component={renderLists} />
							<FieldArray name="requirements" label="Requirements" 				placeholder="Requirement" component={renderLists} />

              <button className="new-job-submit-matching" type="submit" disabled={submitDisabled}>
                {submitting ? <i/> : <i/>} Start Matching
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

const renderLists = ({ fields, label, placeholder, meta: { error } }) => (
					<div>
            <button className="mdl-button new-job-add-button" type="button" onClick={() => {
							fields.push()
						}}><i/>
						{fields.length === 0 && 'Add'} {label}
						</button>

            {fields.map((child, index) =>
                <div key={index}>
										<TextArea field={child} inputClass="text-area" placeholder={ `${placeholder}`+" #"+(index+1)+"..." }/>
                    <button type="button" className="remove-entry" onClick={() => {
											fields.remove(index)
                    }}><i>Remove</i>
                    </button>
                </div>
            )}

					{error && <li className="error">{error}</li>}
					{fields.length > 0 && <button className="add-entry mdl-button" type="button" onClick={() => {
							fields.push()
						}}>Add
					</button>}
        </div>

)

const renderDescription = ({ fields, label, placeholder, meta: { error } }) => (
					<div>
            <button className="mdl-button new-job-add-button" type="button" onClick={() => {
							(fields.length === 0) ? fields.push() : ''
						}}><i/>
						{fields.length === 0 && 'Add'} {label}
						</button>

            {fields.map((child, index) =>
                <div key={index}>
									<TextArea field={child} inputClass="text-area" placeholder={placeholder}/>
                </div>
            )}

					{error && <li className="error">{error}</li>}
        </div>

)


//Define Form
JobForm = reduxForm({
	form: 'jobForm',
	enableReinitialize : true
})(JobForm)

{/*JobForm = connect(
  state => ({
    initialValues: state.candidateMatches.candidate
  })
)(JobForm)*/}

//Export Form
export default JobForm
