import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'
import { find } from 'lodash'
import { Location, EnumSelector, TextArea, TextInput } from 'components/form/inputs'

import {
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA,
} from 'constants/companyOnboarding';

@reduxForm({
    form: 'company',
    fields: [ 'name', 'type', 'employeesAmount', 'foundDate']
})
export default class CandidateForm extends Component {

    render() {
      const {
        fields: { name, type, employeesAmount, foundDate },
        handleSubmit,
        onCancel,
        resetForm,
        submitting,
        } = this.props
      return (
                <form onSubmit={handleSubmit} className="candidate-company-form">
                  <TextInput field={ name } label="Company Name" classInp="mdl-textfield mdl-js-textfield textfield" />


                  <EnumSelector field={type} label="Number of Employees" options={COMPANY_TYPE_DATA} />

                  <EnumSelector field={employeesAmount} label="Company Type" options={COMPANY_EMPLOYEES_DATA} />

                  <TextInput field={ foundDate } label="Year founded" classInp="mdl-textfield mdl-js-textfield textfield" />


                  <div>
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
