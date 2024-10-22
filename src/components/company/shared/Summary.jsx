import React, {Component} from 'react';
import {connect} from 'react-redux'
import {find} from 'lodash'
import {apiImage, dispatchProp} from 'components/helpers'

const propTypes = {
    // name: PropTypes.string,
    // logo: PropTypes.string,
    // ratingImage: PropTypes.string,
    // ratingCount: PropTypes.number,
    // rakuten: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.bool
    // ]),
    // facebook: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.bool
    // ]),
    // linkedin: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.bool
    // ]),
    // twitter: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.bool
    // ]),
    // locationHeadquarters: PropTypes.string,
    // type: PropTypes.string,
    // employeesAmount: PropTypes.string,
    // foundDate: PropTypes.string,
    // onClickGoToCompanyPage: PropTypes.func,
    // onClickGoToBlacklistCompany: PropTypes.func
};

const defaultProps = {
    _id: '--',
    type: '--',
    locationHeadquarters: '--',
    employeesAmount: '--',
    foundDate: '--',
};
@connect(undefined,dispatchProp)
export default class CompanySummary extends Component {

    renderSocialNetworkList() {
        let socialNetworkItem = this.renderSocialNetworkItem
        const socialNetworkArray = ['rakutten', 'facebook', 'linkedin', 'twitter']

        return socialNetworkArray.map( item => {
            let element = this.props[item]

            if(element && element !== true) {
                return socialNetworkItem(item)
            }
        })

    }
    renderSocialNetworkItem(label, href) {
        return (
            <li className="list__item">
                <a href={href} className="link link_type_additional">{label}</a>
            </li>
        )
    }
    renderCompanyInformation() {
        const { locationHeadquarters, type, employeesAmount, foundDate } = this.props

        return (
            <div
                className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle">
                <div className="summary-head__title-column">
									<span className="text summary-head__label">Headquarters</span>
									<span className="text text_size_s summary-head__summary">{locationHeadquarters}</span>
                </div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Company Type</span> <span
                    className="text text_size_s summary-head__summary">{type && Array.isArray(type) ? type.join(', ') : type}</span>
                </div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label"># of employees</span> <span
                    className="text text_size_s summary-head__summary">{employeesAmount}</span></div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Founded</span> <span
                    className="text text_size_s summary-head__summary">{foundDate}</span></div>
            </div>
        )
    }
    render() {
        const { dispatch, name, logo, ratingImage, ratingCount, _id } = this.props
        return (
            <div className="mdl-card card card_type_mini card_state_open">
                <div className="summary-head">
                    <div className="summary-head__title mdl-card__title">
                        <div className="summary-head__title-item">
                            <div className="summary-head__title-column">
                                <img className="image image_round image_size_xxl image_type_company-logo"
                                src={apiImage(logo)}/>
                                <div className="summary-head__title-block">
                                    <h2 className="mdl-card__title-text heading heading_type_two">
                                        {name}
                                        <img src={ratingImage}
                                             className="image image_inline image_type_rating invisible-tablet"/>
                                    </h2>
                                    <div className="mdl-card__subtitle-text summary-head__subtitle-text">
                                        <ul className="list list_type_inline">
                                            {this.renderSocialNetworkList()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-head__title-column text-right summary-head__title-column_width-m_full summary-head__title-column_m_alignment">
                                <div className="mdl-card__subtitle-text">
                                    <span className="summary-head__subtitle-head invisible-desktop">
                                        <img src={ratingImage}
                                             className="image image_inline image_type_rating"/>
                                        <br/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {this.renderCompanyInformation()}
                        <div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_action-bar">
                            <div className="summary-head__title-column">
                              {/*<Link className="link" to={`/candidate/matches/company/${_id}`}>
                                    Go to Company Page
                                </Link>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CompanySummary.propTypes = propTypes;
CompanySummary.defaultProps = defaultProps;
