import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {updateCandidate} from 'actions/candidateMatches'

import CandidateForm from 'components/candidates/Form';
import CandidateSummary from 'components/candidates/Summary';
import CandidateResume from 'components/candidates/Resume';
import CandidateApplicationForm from 'components/candidates/Application';
import Button from 'components/main/button'
import BasicDialog from 'components/main/popup/BasicDialog';


const formatSkills = (values) => {
  let newValues = {...values};
  newValues.skills = values.skills && Array.isArray(values.skills)
    ? values.skills.reduce((obj, s) => {obj[s] = true; return obj} , {})
    : values.skills || {};
  return newValues;
}

const submitSkills = (values) => {
  let newValues = {...values};
  newValues.skills = Object.keys(values.skills).filter(k => values.skills[k] === true);
  return newValues;
}

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

const processAppFields = (values) => {
  // filter out null values
  values.education = values.education.filter(e => e);
  values.workingExperience = values.workingExperience.filter(e => e);
  return values;
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
            <div className="mdl-card candidate-profile">

              {this.state.editSummary ?
                  <CandidateForm
                      initialValues={recentWorkingAreasToParent(candidate)}
                      onSubmit={values=> {dispatch(updateCandidate(recentWorkingAreaFormat(values))); this.editSummary(false)}}
                      onCancel={()=>this.editSummary(false)} />
                  :
                  <CandidateSummary {...this.props} onEdit={()=>this.editSummary(true)}/>
              }
              <div className="card-inner">
                <CandidateResume {...this.props} onEdit={()=>this.editSummary(true)} />
                <CandidateApplicationForm
                  initialValues={formatSkills(candidate)}
                  onSubmit={values=> {dispatch(updateCandidate(submitSkills(processAppFields(values))));
                    this.openDialog();
                  } }/>
              </div>

  						<div className="text-center">
                <BasicDialog trigger={this.state.triggerDialog} >
                  Your application has been saved
                </BasicDialog>
  						</div>
            </div>

        );
    }

}
module.exports = EditContainer;
