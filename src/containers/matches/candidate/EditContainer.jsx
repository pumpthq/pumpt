import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateCandidate } from 'actions/candidateMatches'

import CandidateForm from 'components/candidates/Form';
import CandidateSummary from 'components/candidates/Summary';
import CandidateApplicationForm from 'components/candidates/Application';

import Panel from 'components/main/panel';
import ScrollContainer from 'components/main/scrollContainer'

function mapStateToProps(state, ownProps) {
    return { candidate: state.candidateMatches.candidate, authorization: state.authorization  }
}

@connect(mapStateToProps)
class EditContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { editSummary: false }
    }

    editSummary = (val) => {
        this.setState({editSummary:val})
    }


    render() {
        const { dispatch, candidate } = this.props
        return (
            <div className="mdl-card col-xs-12">

                {this.state.editSummary ?
                    <CandidateForm
                        initialValues={candidate}
                        onSubmit={values=> {dispatch(updateCandidate(values)); this.editSummary(false)}}
                        onCancel={()=>this.editSummary(false)} />
                    :
                    <CandidateSummary {...this.props} onEdit={()=>this.editSummary(true)}/>
                }
                <CandidateApplicationForm
                    initialValues={candidate}
                    onSubmit={values=> {dispatch(updateCandidate(values)) } }/>

            </div>

        );
    }

}
module.exports = EditContainer;
