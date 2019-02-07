import React from 'react';
import {connect} from 'react-redux'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import BasicDialog from 'components/main/popup/BasicDialog'
import FlatButton from 'material-ui/FlatButton';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup } from 'redux-form-material-ui';
import { required } from 'components/main/form/validations';

  class JobCloseForm extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {

      const { title, close, reasonValue, otherValue, trigger, recruiter, handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = this.props
      const submitDisabled = invalid || submitting

      return (
        <div className="message-candidate container">
          <h4 className="text-center">
						Confirm Closing {title}?
					</h4>
          <form onSubmit={handleSubmit} style={{width:'50%',minWidth:200,margin:'auto'}}>
            <div>
              <div className="row">
                <Field name='reason' component={RadioButtonGroup}>
									<RadioButton value="I found a candidate through Pumpt" label="I found a candidate through Pumpt" style={{marginBottom: 12}}/>
									<RadioButton value="I found a candidate somewhere else" label="I found a candidate somewhere else" style={{marginBottom: 12}}/>
									<RadioButton value="We've decided not to hire for this job" label="We've decided not to hire for this job" style={{marginBottom: 12}}/>
                </Field>
              </div>
              <br />
            </div>
            <div className="d-flex justify-content-center">
              <button
                onClick={handleSubmit}
                disabled={submitDisabled}
                className="center mdl-button buttone button_type_colored button_size_m candidate-submit"
              >
                {submitting ? <i/> : <i/>} Close Job
              </button>
            </div>
              <br />
            <div className="d-flex justify-content-center">
              <button
                onClick={e => {e.preventDefault(); close}}
                disabled={submitDisabled}
                className="link"
              >
                {submitting ? <i/> : <i/>} Nevermind
              </button>
            </div>
          </form>
        </div>
      )
    }
}
// Redux Form
JobCloseForm = reduxForm({
	form: 'jobCloseForm',
	enableReinitialize : true,
	initialValues: {
		reason: '',
		other: '',
	}
})(JobCloseForm)

// Decorate with connect to read form values
const selector = formValueSelector('jobCloseForm')
JobCloseForm = connect(state => {
  const reasonValue = selector(state, 'reason')
  const otherValue = selector(state, 'other')

  return {
		reasonValue,
		otherValue
  }
})(JobCloseForm)


//Export Form
export default JobCloseForm
