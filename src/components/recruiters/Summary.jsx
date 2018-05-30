import React, {Component} from 'react'

import PencilIcon from 'components/icons/pencil'

export default class RecruiterSummary extends Component {
    render() {
        //const { recruiter: { firstName, lastName, position } } = this.props
        const { recruiter: { fullName, position, avatar } } = this.props
        const { authorization: {email}, onEdit} = this.props
        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
                            <div class="summary-head__title-block">
                                <h2 class="mdl-card__title-text heading heading_type_two">
                                    <span class="ellipsis-text">
                                        {fullName}
                                    </span>
                                    <a class="link" onClick={onEdit}
                                       style={{
                                        visibility: 'visible',
                                        opacity: 1
                                       }}>
                                        <PencilIcon />
                                        &nbsp;Edit
                                    </a>
                                </h2>
                                <div class="mdl-card__subtitle-text summary-head__subtitle-text">
                                    <span class="text ellipsis-text">{email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Your Position</span>
                            <span class="text text_size_s summary-head__summary">{position}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
