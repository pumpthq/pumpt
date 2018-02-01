import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {updateCandidate} from 'actions/candidateMatches'

import CandidateForm from 'components/candidates/Form';
import CandidateSummary from 'components/candidates/Summary';
import CandidateApplicationForm from 'components/candidates/Application';
import Button from 'components/main/button'
import BasicDialog from 'components/main/popup/BasicDialog';

const recentWorkingAreasToParent = (values) => {
  values.recentWorkingArea = values.recentWorkingAreas.map( a => (a.value));
  values.recentWorkingAreaParent = values.recentWorkingAreas.length > 0 ? values.recentWorkingAreas[0].parent : undefined;

  return values;
}
const recentWorkingAreaFormat = (values) => {
  values.recentWorkingAreas = values.recentWorkingArea.map(a => ({parent: values.recentWorkingAreaParent, value: a}));

  delete values.recentWorkingArea;
  delete values.recentWorkingAreaParent;
  return values;
}

function mapStateToProps(state, ownProps) {
    return { candidate: state.candidateMatches.candidate, authorization: state.authorization  }
}

@connect(mapStateToProps)
class EditContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        editSummary: false,
        triggerDialog: false
      }
    }

    editSummary = (val) => {
        this.setState({editSummary:val})
    }

    openDialog = () => {
      this.setState({ triggerDialog: true });
    }


    render() {
        const { dispatch, candidate } = this.props
        return (
            <div className="mdl-card col-xs-12">

              {this.state.editSummary ?
                  <CandidateForm
                      initialValues={recentWorkingAreasToParent(candidate)}
                      onSubmit={values=> {dispatch(updateCandidate(recentWorkingAreaFormat(values))); this.editSummary(false)}}
                      onCancel={()=>this.editSummary(false)} />
                  :
                  <CandidateSummary {...this.props} onEdit={()=>this.editSummary(true)}/>
              }

              <CandidateApplicationForm
                  onSubmit={values=> {dispatch(updateCandidate(values)) } }/>
          
  						<div className="text-center">
  							<Button
  								type='submit'
  								typeColored
  								buttonSize='l'
  								onClick={this.openDialog}
  							>
  							 Done
  							</Button>
                <BasicDialog trigger={this.state.triggerDialog} onClose={browserHistory.goBack}>
                  Your application has been saved
                </BasicDialog>
  						</div>
            </div>

        );
    }

}
module.exports = EditContainer;
