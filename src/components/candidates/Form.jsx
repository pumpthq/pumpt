import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'
import { find } from 'lodash'
import { Location, EnumSelector, TextArea, TextInput } from 'components/form/inputs'

import {
    INDUSTRY_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
} from 'constants/candidateOnboarding';

@reduxForm({
    form: 'candidate',
    fields: [ 'firstName', 'lastName', 'email', 'recentWorkingArea', 'recentWorkingAreaParent', 'recentJob', 'recentAnnualIncome', 'recentAreaExperience']
})
export default class CandidateForm extends Component {

    constructor(props) {
        super(props)
        const industryParentObj = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title == this.props.fields.recentWorkingAreaParent.value)
        this.state = {industries: industryParentObj ? industryParentObj.items : []}
    }

    componentWillReceiveProps() {
        const industryParentObj = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title == this.props.fields.recentWorkingAreaParent.value)
        if(industryParentObj) {
            this.setState({ industries: industryParentObj.items  })
        }
    }

    updateIndustries = event => {
        const industryParentObj = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title == event.target.value)
        if(industryParentObj) {
            this.setState({ industries: industryParentObj.items  })
        }
        this.props.fields.recentWorkingAreaParent.onBlur(event)
    }

    render() {
      const {
        fields: { firstName, lastName, recentWorkingArea, recentWorkingAreaParent, recentJob, recentAnnualIncome, recentAreaExperience },
        handleSubmit,
        onCancel,
        resetForm,
        submitting,
        } = this.props
      return (
                <form onSubmit={handleSubmit} className="candidate-edit-form">
                  <TextInput field={ firstName } label="First Name" classLb="" classInp="mdl-textfield mdl-js-textfield textfield" />
                  <TextInput field={ lastName } label="Last Name" classLb="" classInp="mdl-textfield mdl-js-textfield textfield " />
                  {/* <TextInput field={ email } label="Email" /> */}

                  <EnumSelector field={recentWorkingAreaParent} label="Industry" options={FIELD_OF_EXPERTISE_DROPDOWN_DATA}
                                onBlur={this.updateIndustries} />
                  <EnumSelector field={recentWorkingArea} label="Field of Expertise" options={this.state.industries} />

                  <EnumSelector field={recentJob} label="Job Title" options={JOB_TITLE_DROPDOWN_DATA[0].items} />

                  <EnumSelector field={recentAnnualIncome} label="Income" options={ANNUAL_INCOME_DROPDOWN_DATA} />
                  <EnumSelector field={recentAreaExperience} label="Experience" options={EXPERIENCE_DROPDOWN_DATA} />


                  <div className="candidate-buttons">
                    <button type="submit" disabled={submitting} className="mdl-button button button_type_colored button_size_m">
                        {submitting ? <i/> : <i/>} Save
                    </button>
                    <button type="button" disabled={submitting} onClick={onCancel} className="mdl-button button button_type_colored button_size_m">
                        Cancel
                    </button>
                  </div>
                </form>

      )
    }
  }
