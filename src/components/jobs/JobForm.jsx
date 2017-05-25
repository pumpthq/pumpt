import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
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
import STATES from 'constants/states.json';
import { find } from 'lodash'

@reduxForm({
    form: 'job',
    fields: ['title', 'state', 'salary', 'experience', 'employment', 'degree', 'industry', 'industryParent', 'description', 'responsibilities[]', 'requirements[]'],
})
class JobForm extends Component {

    constructor(props) {
        super(props)
        const industryParentObj = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title == this.props.fields.industryParent.value)
        this.state = {industries: industryParentObj ? industryParentObj.items : []}
    }

    componentWillReceiveProps() {
        const industryParentObj = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title == this.props.fields.industryParent.value)
        if(industryParentObj) {
            this.setState({ industries: industryParentObj.items  })
        }
    }

    updateIndustries = event => {
        console.log('ok')
        const industryParentObj = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title == event.target.value)
        if(industryParentObj) {
            this.setState({ industries: industryParentObj.items  })
        }
        this.props.fields.industryParent.onBlur(event)
    }

  render() {
    const {
      fields: { title, state, salary, experience, employment, degree, industry, industryParent, description, responsibilities, requirements },
      handleSubmit,
      resetForm,
      submitting,
      } = this.props

    return (
      <div className="mdl-card card card_state_open card_state_scroll">
        <a class="button_type_close" onClick={browserHistory.goBack}>×</a>

        <div className="recruter__newjob-card">

          <form onSubmit={handleSubmit}>
            <div className="recruter__newjob-card__form-top">
              <div>
                <label>Title</label>
                <div>
                  <input className="mdl-textfield__input job-title" type="text" placeholder="Enter Job Title" {...title}/>
                </div>
              </div>
              <div>
                <label>Location</label>
                <div>
                  <select {...state} value={state.value || ''} className="mdl-textfield__input">
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

              <div>
                <button className="new-job-submit-save" type="submit" disabled={submitting}>
                  {submitting ? <i/> : <i/>} Save Job Summary
                </button>

              </div>
            </div>

            <div className="recruter__newjob-card__form-bottom">

              <TextArea field={description} label="Job Description" classLb="job-decription-label" classTa="job-decription-ta"/>

              <TextArray field={responsibilities} label="Responsibilities" />
              <TextArray field={requirements} label="Skills & Requirements" />

              <button className="new-job-submit-matching" type="submit" disabled={submitting}>
                {submitting ? <i/> : <i/>} Start Matching
              </button>
            </div>

          </form>

        </div>

      </div>
    )
  }
}

const EnumSelector = (props) => {
    const {field, label, options, onChange, onBlur} = props
    return (
        <div>
          <label>{label}</label>
          <div>
            <select
              {...field}
              // required syntax for reset form to work
              // undefined will not change value to first empty option
              // when resetting
              value={field.value || ''}
              disabled={options.length === 0}
              onBlur={onBlur}
              className="mdl-textfield__input">
              <option value="" disabled>Select One...</option>
              {options.map( ({id,title}) =>
                  <option key={id} value={title}>{title}</option>
              )}
            </select>
          </div>
        </div>
    )
}

const TextArea = (props) => {
    const { field, label, classLb, classTa } = props
    return (
        <div>
          <label className={classLb}>{label}</label>
          <div>
            <textarea className={classTa}
              {...field}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={field.value || ''}/>
          </div>
        </div>
    )
}

const TextInput = (props) => {
    const { field, label } = props
    return (
          <div>
            <input type="text" placeholder={label}
              {...field}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={field.value || ''}/>
          </div>
    )
}

const TextArray = (props) => {
    const { field, label } = props
    return (
        <div>
            <button className="mdl-button new-job-add-button" type="button" onClick={() => {
              field.addField()    // pushes empty child field onto the end of the array
            }}><i/> Add {label}
            </button>

            {field.map((child, index) =>
                <div key={index}>
                    <TextInput field={child} label={label} />
                    <button type="button" onClick={() => {
                      field.removeField(index)  // remove from index
                    }}><i>Cancel</i>
                    </button>
                </div>
            )}
        </div>
    )
}

export default JobForm
