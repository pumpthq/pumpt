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
                <form onSubmit={handleSubmit}>
                  <TextInput field={ firstName } label="First Name" />
                  <TextInput field={ lastName } label="Last Name" />
                  <TextInput field={ position } label="Position" />

                  <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? <i/> : <i/>} Save
                    </button>
                    <button type="button" disabled={submitting} onClick={onCancel}>
                        Cancel
                    </button>
                  </div>
                </form>

      )
    }
  }
