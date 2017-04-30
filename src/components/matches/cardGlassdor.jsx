import React, {Component, PropTypes} from 'react';
import GlassDoorImage from './glassdoor.jpg'

const propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    ratingImage: PropTypes.string,
    ratingCount: PropTypes.number,
    rakuten: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    facebook: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    linkedin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    twitter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    headquarters: PropTypes.string,
    companyType: PropTypes.string,
    ofEmployees: PropTypes.string,
    founded: PropTypes.string,
    onClickGoToCompanyPage: PropTypes.func,
    onClickGoToBlacklistCompany: PropTypes.func
};

const defaultProps = {
    name: 'New York Times',
    logo: '//superrepo.org/static/images/icons/original/xplugin.video.nytimes.png.pagespeed.ic.XOPQITkLio.png',
    ratingImage: '',
    ratingCount: 2,
    rakuten: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    headquarters: 'New York, NY',
    companyType: 'Publishing',
    ofEmployees: '500-1000',
    founded: '1982',
    onClickGoToCompanyPage: e => {},
    onClickGoToBlacklistCompany: e => {}
};

export default class cardGlassdor extends Component {
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
        const { headquarters, companyType, ofEmployees, founded } = this.props

        return (
            <div
                className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle">
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Headquarters</span> <span
                    className="text text_size_s summary-head__summary">{headquarters}</span>
                </div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Company Type</span> <span
                    className="text text_size_s summary-head__summary">{companyType}</span>
                </div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label"># of employees</span> <span
                    className="text text_size_s summary-head__summary">{ofEmployees}</span></div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Founded</span> <span
                    className="text text_size_s summary-head__summary">{founded}</span></div>
            </div>
        )
    }
    render() {
        const { name, logo, ratingImage, ratingCount, onClickGoToCompanyPage, onClickGoToBlacklistCompany } = this.props
        return (
            <div className="mdl-card card card_type_mini card_state_open">
                <div className="summary-head">
                    <div className="summary-head__title mdl-card__title">
                        <div className="summary-head__title-item">
                            <div className="summary-head__title-column">
                                <img className="image image_round image_size_xxl image_type_company-logo"
                                src={logo}/>
                                <div className="summary-head__title-block">
                                    <h2 className="mdl-card__title-text heading heading_type_two">
                                        {name}
                                        <img src={ratingImage}
                                             className="image image_inline image_type_rating invisible-tablet"/>
                                        <span className="text text_color_grey invisible-tablet">
                                            {ratingCount} reviews
                                        </span>
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
                                        <span className="text text_color_grey">{ratingCount} reviews</span>
                                    </span>
                                    <span className="summary-head__subtitle-head">
                                        <span className="text text_color_l-grey">
                                            Powered by<br className="invisible-desktop"/>
                                            <a href="#">
                                                <img src={GlassDoorImage} className="image image_type_rating-name"/>
                                            </a>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {this.renderCompanyInformation()}
                        <div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_action-bar">
                            <div className="summary-head__title-column">
                                <a className="link" onClick={onClickGoToCompanyPage}>
                                    Go to Company Page
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

cardGlassdor.propTypes = propTypes;
cardGlassdor.defaultProps = defaultProps;
