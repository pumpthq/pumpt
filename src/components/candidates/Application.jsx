import React, {Component, PropTypes} from 'react';
import GlassDoorImage from 'img/glassdoor.jpg'
import { reduxForm } from 'redux-form'
import { tintedBackground } from 'components/helpers'
import { browserHistory } from 'react-router'
import { Picker } from 'react-month-picker'

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


const stateMap = Object.keys(STATES).map(id=> ({id,title:STATES[id]}))

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
            <TextInput field={duty} placeholder="Description of your work" />
					</div>
					<div class="col-md-3">
            <TextInput field={startWorkingAt} placeholder="Start Date" />
					</div>
					<div class="col-md-3">
            <TextInput field={endWorkingAt} placeholder="End Date" />
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
            <TextInput field={startStudyAt} placeholder="Start Date" />
					</div>
					<div class="col-md-3">
            <TextInput field={endStudyAt} placeholder="End Date" />
					</div>
        </div>
    )
}


const SkillEntry = props => {
	const { field: { title, value, alternative, items } } = props
	return (
			<div class="row skill-application-item">
				<TextInput field={title} placeholder="Skill" />
			</div>
		)
}

@reduxForm({
    form: 'candidate-application',
    fields: [
        'workingExperience[]',
        'workingExperience[].companyName',
        'workingExperience[].position',
        'workingExperience[].duty',
        'workingExperience[].city',
        'workingExperience[].state',
        'workingExperience[].startWorkingAt',
        'workingExperience[].endWorkingAt',
        'workingExperience[].isCurrentJob',

        'skills[]',

        'interests[]',
        'interests[].image',
        'interests[].description',

        'education[]',
        'education[].schoolName',
        'education[].speciality',
        'education[].degree',
        'education[].startStudyAt',
        'education[].endStudyAt',
        'socialMedia.linkedInUrl',
        'socialMedia.twitterAcc',
        'socialMedia.faceBookUrl',

        'location',
        'location.city',
        'location.state',
        'location.abilityToRelocate',


        'avatar',  ]
})

export default class ApplicationForm extends Component {
    constructor(props) {
      super(props)
      this.state = { isEdit: true }
    }

    onEdit = () => {
      this.setState({ isEdit: true})
    }

    render() {
      const {
        fields: { avatar, workingExperience, location, skills, interests, education, socialMedia },
        handleSubmit,
        resetForm,
        submitting,
        } = this.props

      return (
                <form onSubmit={handleSubmit} className={`candidate-application-form ${this.state.isEdit && "text-input-underlined"}`}>

                    <CaseIcon/>
                    <FieldArray field={workingExperience} label="Experience" component={ExperienceEntry} />
                    <CardDivider/>

                    <Education/>
                    <FieldArray field={education} label="Education" component={EducationEntry} />
                    <CardDivider/>

                    <Skills/>
                    <FieldArray field={skills} label="Skills" component={SkillEntry} />

                    <Social/>
										<h2 className="social-application-item">Add Social Media</h2>

                    <div className="social-media-block">
                      <LinkedInIcon />
                      <TextInput field={socialMedia.linkedInUrl} label="LinkedIn" classItm="label-item-social" />

                      <TwitterIcon />
                      <TextInput field={socialMedia.twitterAcc} label="Twitter" classItm="label-item-social" />

                      <FacebookIcon />
                      <TextInput field={socialMedia.faceBookUrl} label="Facebook" classItm="label-item-social" />
                    </div>
                    <CardDivider/>


                    {/* <div>
                        <button type="button" onClick={() => {
                          field.addField()    // pushes empty child field onto the end of the array
                        }}><i/> Add {label}
                        </button>

                        {field.map((child, index) =>
                            <div key={index}>
                                <TextInput field={child} label={label} />
                                <button type="button" onClick={() => {
                                  field.removeField(index)  // remove from index
                                }}><i>Remove</i>
                                </button>
                            </div>
                        )}
                    </div>


                  <div>
                    <label>Title</label>
                    <div>
                      <input class="mdl-textfield__input" type="text" placeholder="Enter Job Title" {...title}/>
                    </div>
                  </div>
                  <div>
                    <label>Location</label>
                    <div>
                      <select {...state} value={state.value || ''}>
                        <option value='' disabled>Select One...</option>
                        {Object.keys(STATES).map(state =>
                          <option key={state} value={STATES[state]}>{STATES[state]}</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <EnumSelector field={salary} label="Salary" options={ANNUAL_INCOME_DROPDOWN_DATA} />
                  <EnumSelector field={experience} label="Experience" options={EXPERIENCE_DROPDOWN_DATA} />
                  <EnumSelector field={employment} label="Employment" options={EMPLOYEMENTS_DROPDOWN_DATA} />
                  <EnumSelector field={degree} label="Degree" options={DEGREES_DROPDOWN_DATA} />
                  <EnumSelector field={industryParent} label="Industry" options={FIELD_OF_EXPERTISE_DROPDOWN_DATA}
                                onBlur={this.updateIndustries} />
                  <EnumSelector field={industry} label="Field of Expertise" options={this.state.industries} />

                  <TextArea field={description} label="Description" />
                  <TextArea field={responsibilities} label="Responsibilities" />
                  <TextArea field={requirements} label="Requirements" /> */}





                  <div>
                    <button type="submit" disabled={submitting}
                    className="mdl-button button invisible-mobile button_type_colored button_size_m candidate-submit">
                      {submitting ? <i/> : <i/>} Save Progress
                    </button>
                    {/* <button type="button" disabled={submitting} onClick={resetForm}>
                     Clear Values
                     </button> */}
                  </div>
                </form>

      )
    }
  }


const FieldArray = (props) => {
    const { field, label } = props
    const Item = props.component
    return (
        <div className="application-item">
            <button className="application-item-button" type="button" onClick={() => {
              field.addField()    // pushes empty child field onto the end of the array
            }}><i/>
						{field.length === 0 && 'Add'} {label}
            </button>

            {field.map((child, index) =>
                <div key={index} className="info-block">
                    <Item field={child} />
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



const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)
