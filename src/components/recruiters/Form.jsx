import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form'
import { Location, EnumSelector, TextArea, TextInput } from 'components/form/inputs'

@reduxForm({
    form: 'recruiter',
    fields: [ 'firstName', 'lastName', 'position']
})
export default class RecruiterForm extends Component {

    render() {
      const {
        fields: { firstName, lastName, position },
        handleSubmit,
        onCancel,
        resetForm,
        submitting,
        } = this.props
      return (
                <form onSubmit={handleSubmit} className="recruiter-form">
                  <TextInput field={ firstName } label="First Name" classInp="mdl-textfield mdl-js-textfield textfield" />
                  <TextInput field={ lastName } label="Last Name" classInp="mdl-textfield mdl-js-textfield textfield " />
                  <TextInput field={ position } label="Position" classInp="mdl-textfield mdl-js-textfield textfield " />

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
