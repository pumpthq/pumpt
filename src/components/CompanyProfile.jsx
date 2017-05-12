import React, {Component, PropTypes} from 'react';
import GlassDoorImage from 'img/glassdoor.jpg'

import { tintedBackground } from 'components/helpers'

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
    // name: 'New York Times',
    // logo: '//superrepo.org/static/images/icons/original/xplugin.video.nytimes.png.pagespeed.ic.XOPQITkLio.png',
    // ratingImage: '',
    // ratingCount: 2,
    // rakuten: '',
    // facebook: '',
    // linkedin: '',
    // twitter: '',
    // locationHeadquarters: 'New York, NY',
    // type: 'Publishing',
    // employeesAmount: '500-1000',
    // foundDate: '1982',
    // onClickGoToCompanyPage: e => {},
    // onClickGoToBlacklistCompany: e => {}
    locationHeadquarters: {city:'', state:''}
};


export default class CompanyProfile extends Component {

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
    renderCompanyHeader() {
        const { locationHeadquarters, type, employeesAmount, foundDate } = this.props

        return (
            <div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle">
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Headquarters</span> <span
                    className="text text_size_s summary-head__summary">{locationHeadquarters.city}, {locationHeadquarters.state.substring(0,2)}</span>
                </div>
                <div className="summary-head__title-column"><span
                    className="text summary-head__label">Company Type</span> <span
                    className="text text_size_s summary-head__summary">{type}</span>
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
    renderDescriptionSection() {
        const { description, quoteOrMotto } = this.props
        return (

            <div className="card__middle-block">
                <span className="text  summary-head__label">Description</span>

                {description}

                <div className="aside">

                    <span className="text  summary-head__label">Quote</span>
                    { quoteOrMotto }
                </div>
            </div>

        );

    }

    renderMediaSection() {
        const { images } = this.props
        return (
            <div className="card__middle-block">
                {images}
            </div>
        );
    }

    renderLocationSection() {
        const { locationOffices } = this.props
        return (

            <div className="card__middle-block">

                <span className="text  summary-head__label">Locations</span>
                    { locationOffices && locationOffices.map(location =>

                        <div key={`${location.city}`} className="summary-head__title-column">
                            <span className="text summary-head__summary">{`${location.city}, ${location.state.substring(0,2)}`}</span>
                            {/* <span className="text text_size_s summary-head__summary">{locationHeadquarters}</span> */}
                        </div>
                    )}
            </div>
        );
    }

    render() {
        const { name, background, logo, ratingImage, ratingCount, onClickGoToCompanyPage, onClickGoToBlacklistCompany } = this.props
        return (
            <div className="mdl-card card card_type_mini card_state_open">
                <div className="summary-hero" style={ tintedBackground(background,255,255,255,0) }></div>
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
                        {this.renderCompanyHeader()}

                        {/* <div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_action-bar">
                            <div className="summary-head__title-column">
                                <a className="link" onClick={onClickGoToCompanyPage}>
                                    Go to Company Page
                                </a>
                            </div>
                        </div> */}
                    </div>
                </div>

                <CardDivider />
                {this.renderDescriptionSection()}

                <CardDivider />
                {this.renderMediaSection()}

                <CardDivider />
                {this.renderLocationSection()}
            </div>
        )
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

CompanyProfile.propTypes = propTypes;
CompanyProfile.defaultProps = defaultProps;
