import React, {Component} from 'react';
import {connect} from 'react-redux';
import BasicDialog from 'components/main/popup/BasicDialog';
import FlatButton from 'material-ui/FlatButton';

const deactivate = () => ({type: "DEACTIVATE"})

const mapStateToProps = (state) => {
  return {active: state.candidateMatches.candidate.active}
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
  handleChange = (v) => {
    this.setState({email: v});
  }
    render() {
        const {dispatch} = this.props

        return (
          <div>
            <h3>
              Deactivate Account
            </h3>
            <p>
             Do you want to deactivate your account? Know that by deactivating your account, you will no longer receive job matches, etc.
           </p>
           <form className="application-form">
              <input
                className="mdl-textfield__input textfield__input"
                name="email"
                placeholder="email address"
                type="email"
                onChange={this.handleChange}
              />
              <br />
              <button
              className="button_type_colored"
              onClick={this.triggerModal}
              >
                Deactivate
              </button>
              <BasicDialog
                trigger={this.state.modalTrigger}
                mainAction={
                  <FlatButton
                    label="OK"
                    onTouchTap={() => {dispatch(deactivate())}}
                    primary
                  />
                }
              >
                <h4>
Are you sure you want to deactivate your account?
                </h4>
                <p>
You will need to visit this page to reactivate your account.
                </p>
            </BasicDialog>
           </form>
          </div>
        )
    }
}
