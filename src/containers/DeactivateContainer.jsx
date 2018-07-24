import React, {Component} from 'react';
import {connect} from 'react-redux';
import BasicDialog from 'components/main/popup/BasicDialog';
import FlatButton from 'material-ui/FlatButton';
import {deactivateCandidate, activateCandidate} from 'actions/candidateMatches';

const mapStateToProps = (state) => {
  return {
    active: state.candidateMatches.candidate.active,
    email: state.authorization.email,
  }
}

@connect(mapStateToProps)
export default class Deactivate extends Component {
  constructor (props) {
    super(props);
    this.state = {email: '', modalTrigger: false};
  }
  triggerModal = (e) => {
    e.preventDefault();
    this.setState(({modalTrigger}) => ({modalTrigger: !modalTrigger}))
  }
  handleChange = (e) => {
    this.setState({email: e.target.value});
  }
    render() {
        const {dispatch, active} = this.props

        if (!active) {
          return (
<div>
          <h3 className="heading heading_type_three">
            Reactivate Account
            </h3>
            <p className="text">
             Want to reactivate your account? Click the button below in order to receive job matches.
           </p>
           <form
             className="form_padding-size_xs"
             onSubmit={(e) => {e.preventDefault(); dispatch(activateCandidate())}}
           >
              <button
                type="submit"
                className="mdl-button button button_margin-right_m button_type_colored button_size_50p"
              >
                Reactivate Your Account
              </button>
           </form>
          </div>

          )} else {
        return (
          <div>
<<<<<<< HEAD
            <h3>
              Deactivate Account
=======
          <h3>
            Deactivate Account
>>>>>>> staging
            </h3>
            <p className="text">
             Do you want to deactivate your account? By deactivating your account, you will no longer receive job matches.
           </p>
           <form className="application-form">
              <input
                className="mdl-textfield__input textfield__input"
                name="email"
                placeholder="Email Address"
                type="email"
                onChange={this.handleChange}
              />
              <br />
              <button
              className="button_type_colored"
              disabled={this.props.email !== this.state.email}
              onClick={this.triggerModal}
              >
                Deactivate
              </button>
              <BasicDialog
                trigger={this.state.modalTrigger}
                mainAction={
                  <FlatButton
                    type="submit"
                    label="OK"
                    onTouchTap={() => {dispatch(deactivateCandidate())}}
                    primary
                  />
                }
              >
                <h4>
Are you sure you want to deactivate your account?
                </h4>
                <p>
You will need to visit the settings page to reactivate your account.
                </p>
            </BasicDialog>
           </form>
          </div>
        )
        }
    }
}
