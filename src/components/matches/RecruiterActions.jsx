import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router'

import ButtonApply from 'components/parts/buttonApply'
import ButtonLink from 'components/parts/buttonLink'

import {openApprove, postBookmark, postReject, postRestore} from 'actions/companyJobs'


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions : {
            addToBookmark: () => {
                dispatch(postBookmark(ownProps.match._id))
            },
            postReject: () => {
                dispatch(postReject(ownProps.match._id))
            },
            postRestore: () => {
                dispatch(postRestore(ownProps.match._id))
            },
            openApprove: () => {
                dispatch(openApprove(ownProps.match._id))
            }
        },
        dispatch
    }
}
@connect(undefined,mapDispatchToProps)
export default class RecruiterActions extends Component {

    render() {
        const { actions: { postReject, postRestore, addToBookmark, openApprove }, match: { candidate }, match } = this.props

        if(candidate.status==='new') {
            return (
                <div>
									<Link className="link mdl-button button button_type_colored button_include_icon" to={`recruiter/jobs/${match._vacancy}/candidates/${match._candidate}`}>
											View Candidate Details
									</Link>
									<ButtonApply onClick={openApprove} >
											Connect
									</ButtonApply>
									<ButtonLink onClick={postReject} >
											Not interested
									</ButtonLink>
                </div>
            )
        }

        if(candidate.status==='approved') {
            return (
              <div>
                <Link className="link mdl-button button button_type_colored button_include_icon" to={`recruiter/jobs/${match._vacancy}/candidates/${match._candidate}`}>
                    View Candidate Details
                </Link>
                <ButtonApply onClick={openApprove} >
                    Send Message
                </ButtonApply>
              </div>

            )
        }

        if(candidate.status==='rejected') {
            return(
                <ButtonLink onClick={postRestore}>
                    Restore
                </ButtonLink>
            )
        }
				else{
					return(<div></div>)
				}
    }

}
