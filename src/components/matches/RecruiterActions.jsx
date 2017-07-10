import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'

import ButtonApply from 'components/parts/buttonApply'
import ButtonLink from 'components/parts/buttonLink'

import { BookmarkOpen, BookmarkFill, ApproveOpen, Decline } from 'components/icons'

import { postBookmark, postReject, postRestore, postApprove, openApprove } from 'actions/companyJobs'


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions : {
            addToBookmark: () => {
                dispatch(postBookmark(ownProps.match._id))
            },
            postReject: () => {
                dispatch(postReject(ownProps.match._id))
            },
            postApprove: () => {
                dispatch(postApprove(ownProps.match._id))
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
        const { actions: { postApprove, postReject, postRestore, addToBookmark, openApprove }, match: { candidate } } = this.props

        if(candidate.status==='new') {
            return (
                <div>
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
                <ButtonApply onClick={openApprove} >
                    Send Message
                </ButtonApply>
            )
        }

        if(candidate.status==='rejected') {
            return(
                <ButtonLink onClick={postRestore}>
                    Restore
                </ButtonLink>
            )
        }
    }

}
