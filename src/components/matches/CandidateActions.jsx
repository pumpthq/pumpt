import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'

import ButtonApply from 'components/parts/buttonApply'
import ButtonLink from 'components/parts/buttonLink'

import { BookmarkOpen, BookmarkFill, ApproveOpen, Decline } from 'components/icons'

function BookmarkOption(props){
	var html = null;

	if (props.vacancy.status=="bookmarked") {
		html = <button className="mdl-button" disabled><BookmarkFill className=""/>Bookmarked</button>;
	}
	else if(props.vacancy.status=="rejected"){
		html = <button className="mdl-button" onClick={props.addToBookmark}><ButtonLink className="">Restore</ButtonLink></button>;
	}
	else{
		html=<button className="mdl-button" onClick={props.addToBookmark}><BookmarkOpen className=""/>Bookmark</button>;
	}
	return html;
}

function ApplyOption(props){
	var html=null;
	if (props.vacancy.status=="rejected") {
	}
	else if(props.vacancy.status=="approved"){
	}
	else{
		html=<ButtonApply onClick={props.postApprove} icon={<ApproveOpen className=""/>}>Connect</ButtonApply>;
	}
	return html;
}

function RejectOption(props){
	var html=null;
	if (props.vacancy.status=="rejected") {
	}
	else if(props.vacancy.status=="approved"){
	}
	else{
		html=<ButtonLink onClick={props.postReject} icon={<Decline className=""/>}>Not interested</ButtonLink>;
	}
	return html;
}

export default class CandidateActions extends Component {

    render() {
        const { postApprove, postReject, addToBookmark, vacancy } = this.props
        return (
                            <div className="card__actions-wrapper">

                                <div className="mdl-card__actions card__actions">

                                    {vacancy &&
                                        <span>

																				<ApplyOption vacancy={vacancy} postApprove={postApprove} />
																				<BookmarkOption vacancy={vacancy} addToBookmark={addToBookmark} />
																				<RejectOption vacancy={vacancy} postReject={postReject} />

                                        </span>
                                    }

                                </div>
                            </div>
        )
    }
}
