import React, {Component, PropTypes} from 'react';
import GlassDoorImage from 'img/glassdoor.jpg'
import { reduxForm } from 'redux-form'
import { tintedBackground } from 'components/helpers'
import { browserHistory } from 'react-router'

import { Location, EnumSelector, TextArea, TextInput, DateInput } from 'components/form/inputs'

import {
    EMPLOYEMENTS_DROPDOWN_DATA,
    DEGREES_DROPDOWN_DATA,
} from 'constants/companyJobs';

import STATES from 'constants/states.json';

import PencilIcon from 'components/icons/pencil'
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
    const { field: { companyName, position, location, duty, isCurrentJob, startWorkingAt, endWorkingAt } } = props
    return (
        <div>
            <TextInput field={companyName} placeholder="Company Name" />
            <TextInput field={position} placeholder="Title" />
            <EnumSelector field={location} options={stateMap} />
            <TextInput field={duty} placeholder="Description of your work" />
            <DateInput field={startWorkingAt} placeholder="start date" />
            <DateInput field={endWorkingAt} placeholder="end date" />
        </div>
    )
}

const EducationEntry = props => {
    const { field: { schoolName, speciality, degree, startStudyAt, endStudyAt } } = props
    return (
        <div>
            <TextInput field={schoolName} placeholder="School Name" />
            <TextInput field={speciality} placeholder="Field of Study" />
            <EnumSelector field={degree} label="Degree" options={DEGREES_DROPDOWN_DATA} />
            <DateInput field={startStudyAt} placeholder="start date" />
            <DateInput field={endStudyAt} placeholder="end date" />
        </div>
    )
}

const InterestEntry = props => {
    const { field: { image, description } } = props
    return (
        <div>
            <TextInput field={description} placeholder="Description" />
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
        'workingExperience[].location',
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
      this.state = { isEdit: false }
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

                  {
                    !this.state.isEdit &&
                    <a class="link edit-link" onClick={this.onEdit}
                       style={{
                         visibility: 'visible',
                         opacity: 1
                       }}>
                      <PencilIcon />
                      &nbsp;Edit
                    </a>
                  }

                    <CaseIcon/>
                    <FieldArray field={workingExperience} label="Experience" component={ExperienceEntry} />
                    <CardDivider/>

                    <Education/>
                    <FieldArray field={education} label="Education" component={EducationEntry} />
                    <CardDivider/>

                    <Heart/>
                    <FieldArray field={interests} label="Interests" component={InterestEntry} />
                    <CardDivider/>

                    <Pin/><p className="icon-item">Location</p>
                    <Location field={location} />
                    <CardDivider/>

                    <Social/><p className="icon-item">Social Media</p>

                    <div className="social-media-block">
                      <LinkedInIcon />
                      <TextInput field={socialMedia.linkedInUrl} label="LinkedIn" classItm="label-item-location" />

                      <TwitterIcon />
                      <TextInput field={socialMedia.twitterAcc} label="Twitter" classItm="label-item-location" />

                      <FacebookIcon />
                      <TextInput field={socialMedia.faceBookUrl} label="Facebook" clasclassItm="label-item-location" />
                    </div>
                    <CardDivider/>

                    {/* <FieldArray field={skills} label="Skills" component={SkillEntry} /> */}

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
                      {submitting ? <i/> : <i/>} Save
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
            }}><i/> Add {label}
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
        </div>
    )
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)
