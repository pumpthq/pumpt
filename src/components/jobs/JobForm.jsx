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
    fields: ['title', 'state', 'salary', 'experience', 'employment', 'degree', 'industry', 'industryParent', 'description', 'responsibilities', 'requirements'],
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

        <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <div>
            <input type="text" placeholder="Title" {...title}/>
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
        <TextArea field={requirements} label="Requirements" />

        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          {/* <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button> */}
        </div>
      </form>
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
              onBlur={onBlur}>
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
    const { field, label } = props
    return (
        <div>
          <label>{label}</label>
          <div>
            <textarea
              {...field}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={field.value || ''}/>
          </div>
        </div>
    )
}

export default JobForm
