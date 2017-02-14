import React, { Component, PropTypes } from 'react';
import imgPencil from '../../../../img/sprites-svg/pencil.svg'

import UploadImage from '../../../../components/application/uploadImage'

const propTypes = {
    fullName: PropTypes.string,
    email: PropTypes.string,
    list: PropTypes.shape({
        industry: PropTypes.string,
        fieldOfExpertise: PropTypes.string,
        jobTitle: PropTypes.string,
        income: PropTypes.string,
        experience: PropTypes.string
    }),
    onEdit: PropTypes.func,
    onSubmitImage: PropTypes.func

};

const defaultProps = {
    fullName: 'Jane Sullivan',
    email: 'j.sullivan@sd-ventures.com',
    list: {
        industry: 'Digital Media',
        fieldOfExpertise: 'Programmatic',
        jobTitle: 'Account Coordinator',
        income: '$50–100K',
        experience: '5–10 years'
    },
    onEdit: e=>{},
    onSubmitImage: e=>{}
};

export default class SummaryHead extends Component {
    render() {
        const { fullName, email, list, onEdit, onSubmitImage } = this.props
        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item">
                        <div class="summary-head__title-column">
                            <UploadImage onSubmit={onSubmitImage}/>
                            <div class="summary-head__title-block">
                                <h2 class="mdl-card__title-text heading heading_type_two">
                                    {fullName}
                                    <a class="link" onClick={onEdit}>
                                        <img class="icon icon-pencil" src={imgPencil}/>
                                        Edit
                                    </a>
                                </h2>
                                <div class="mdl-card__subtitle-text summary-head__subtitle-text">
                                    <span class="text">{email}</span>
                                    <ul class="list list_type_inline">
                                        <li class="list__item"><span class="text">{list.industry}</span></li>
                                        <li class="list__item"><span class="text">{list.fieldOfExpertise}</span></li>
                                        <li class="list__item"><span class="text">{list.jobTitle}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Annual Income</span>
                            <span class="text text_size_s summary-head__summary">{list.income}</span>
                        </div>
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Industry Experience </span>
                            <span class="text text_size_s summary-head__summary">{list.experience}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SummaryHead.propTypes = propTypes;
SummaryHead.defaultProps = defaultProps;
