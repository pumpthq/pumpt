import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'

import ButtonApply from 'components/parts/buttonApply'
import ButtonLink from 'components/parts/buttonLink'

import { BookmarkOpen, BookmarkFill, ApproveOpen, Decline } from 'components/icons'

export default class CandidateActions extends Component {

    render() {
        const { postApprove, postReject, addToBookmark, vacancy } = this.props
        return (
                            <div className="card__actions-wrapper">

                                <div className="mdl-card__actions card__actions">
                                    <ButtonApply onClick={postApprove} icon={<ApproveOpen className=""/>}>
                                        Apply
                                    </ButtonApply>
                                    <ButtonLink onClick={postReject} icon={<Decline className=""/>}>
                                        Not interested
                                    </ButtonLink>

                                    {vacancy &&
                                        <span>
                                        {vacancy.status=="bookmarked" ?
                                            <button className="mdl-button" disabled>
                                                <BookmarkFill className=""/>
                                                Bookmarked
                                            </button>
                                            :
                                            <button className="mdl-button" onClick={addToBookmark}>
                                                <BookmarkOpen className=""/>
                                                Bookmark
                                            </button>
                                        }
                                        </span>
                                    }

                                </div>
                            </div>
        )
    }
}
