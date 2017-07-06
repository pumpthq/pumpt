import React, {Component, PropTypes} from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { Location, EnumSelector, TextArea, TextInput } from 'components/form/inputs'

//Actions
import { updateCandidate } from 'actions/candidateMatches'

import { browserHistory } from 'react-router'
import { find } from 'lodash'

//Special Normalizer for Data Fields
const lessThan = otherField => (value, previousValue, allValues) =>
  parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue

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

//Form
let CandidateSummaryForm = props =>  {
	const {
		handleSubmit,
		submitting,
		error,
		invalid,
		valid,
		dispatch,
		names,
	 	values,
        onCancel,
	} = props

	const submitDisabled = invalid || submitting

		return (

			<form onSubmit={handleSubmit} class="candidate-edit-form"> 
				<div class="row">
					<div class="col-md-4">
						<Field
							name="firstName"
							type="text"
							component={renderField}
							label="First Name"
						/>
					</div>
					<div class="col-md-4">
						<Field
							name="lastName"
							type="text"
							component={renderField}
							label="Last Name"
						/>
					</div>
					<div class="col-md-12">
						<div class="row">
							<div class="col-md-4">
								<Field
									label="Industry"
									class="mdl-textfield__input textfield__input small_textfield_input"
									name="interestWorkingArea"
									component="select">
									<option value="" class="disabled-text-option" disabled selected>Industry</option>
									{ industryData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field
									label="Working Area"
									class="mdl-textfield__input textfield__input"
									name="recentWorkingAreaParent"
									component="select">
									<option value="" class="disabled-text-option" disabled selected>Working Area</option>
									{ workingAreaData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field
									label="Specialty"
									class="mdl-textfield__input textfield__input"
									name="recentWorkingArea"
									component="select">
									<option value="" class="disabled-text-option" disabled selected>Specialty</option>
									{ specialtyData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field
									label="Income"
									class="mdl-textfield__input textfield__input"
									name="recentAnnualIncome"
									component="select">
									<option value="" class="disabled-text-option" disabled selected>Annual Income</option>
									{ annualIncomeData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field
									label="Job Title"
									class="mdl-textfield__input textfield__input"
									name="recentJob"
									component="select">
									<option value="" class="disabled-text-option" disabled selected>Job Title</option>
									{ jobTitleData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field
									label="Experience"
									class="mdl-textfield__input textfield__input"
									name="recentAreaExperience"
									component="select">
									<option value="" class="disabled-text-option" disabled selected>Industry Experience</option>
									{ experienceData.map((item) => {return <option value={item.value}>{item.name}</option>}) }
								</Field>
							</div>
						</div>
					</div>
			</div>

				{/*<EnumSelector field={recentWorkingAreaParent} label="Working Area" options={
											onBlur={this.updateIndustries} />*/}

				<div className="candidate-buttons">
					<button type="submit" disabled={submitDisabled} className="mdl-button button button_type_colored button_size_m">
							{submitting ? <i/> : <i/>} Save
					</button>
                    <button type="button" disabled={submitting} onClick={onCancel} className="mdl-button button button_type_colored button_size_m">
                        Cancel
                    </button>
				</div>


			</form>
		)
	}

//Define Form
CandidateSummaryForm = reduxForm({
	form: 'candidateSummaryForm',
	enableReinitialize : true,
	// onSubmit: submit /* use onSubmit prop passed to component instead */
})(CandidateSummaryForm)


//Export Form
export default CandidateSummaryForm
