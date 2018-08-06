import React, {Component} from 'react'

import ButtonApply from 'components/parts/buttonApply'
import ButtonLink from 'components/parts/buttonLink'

function BookmarkOption(props){
	var html = null;

	if (props.vacancy.status=="bookmarked") {
		html = <ButtonLink disabled="true" secondary={true}>Bookmarked</ButtonLink>;
	}
	else if(props.vacancy.status=="rejected"){
		html = <ButtonLink onClick={props.addToBookmark}>Restore</ButtonLink>;
  } else if (props.vacancy.status=="approved") {
  }
	else{
		html=<ButtonLink onClick={props.addToBookmark}>Bookmark</ButtonLink>;
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
		html=<ButtonApply onClick={props.postApprove}>Apply</ButtonApply>;
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
		html=<ButtonLink onClick={props.postReject} secondary={true}>Not interested</ButtonLink>;
	}
	return html;
}

export default class CandidateActions extends Component {

  render() {
    const { postApprove, postReject, addToBookmark, vacancy } = this.props
    return (
      <div className="card__actions-wrapper text-center">
        {vacancy &&
            <span>

              <BookmarkOption vacancy={vacancy} addToBookmark={addToBookmark} />
              <RejectOption vacancy={vacancy} postReject={postReject} />
              <ApplyOption vacancy={vacancy} postApprove={postApprove} />
            </span>
        }
      </div>
    )
  }
}
