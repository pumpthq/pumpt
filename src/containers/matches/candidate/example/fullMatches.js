import React, { Component, PropTypes } from 'react'

//Slider
import MatchesIcon from '../../../../components/icons/Matches'
import BookmarkFillIcon from '../../../../components/icons/BookmarkFill'
import DeclineIcon from '../../../../components/icons/Decline'

import '../matches.less'

import Wrapper from '../../../../components/main/wrapper'
import { HeaderFull, HeaderDropDownMenu, HeaderDropDownItem } from '../../../../components/main/header'
import { CardClose, TabBar, CardOpen, CardGlassdoor, DescriptiveParagraph, DescriptiveList, DescriptiveListItem} from '../../../../components/matches'
import Carousel from 'component/Carousel'

import logoImage from '../../../../img/sprites-svg/logo.svg'

class OnboardingCandidate extends Component {
    constructor(props) {
        super(props)

        this.tabList = [
            {
                label: 'All Matches',
                icon: <MatchesIcon className="icon_inline"/>,
                onClick: e => { console.log('Matches [All]')},
                active: true
            },
            {
                label: 'Bookmarked',
                icon: <BookmarkFill className="icon_inline"/>,
                onClick: e => { console.log('Matches [Bookmark]')},
                active: false
            },
            {
                label: 'Not interested',
                icon: <DeclineIcon className="icon_inline"/>,
                onClick: e => { console.log('Matches [Not interested]')},
                active: false
            }
        ]

        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
    }

    next() {
        //this.refs.carousel.slickNext()
    }
    previous() {
        //this.refs.carousel.slickPrev()
    }

    renderHeaderAdditionPart() {
        return (
            <HeaderDropDownMenu
                userName="Jane Sullivan"
                userAvatar="https://projects.softfacade.com/www/pumpt-web-app/assets/img/image/c-small-bd6da9bfee.jpg"
            >
                <HeaderDropDownItem>Profile</HeaderDropDownItem>
                <HeaderDropDownItem>Change Password</HeaderDropDownItem>
                <HeaderDropDownItem>Notification Settings</HeaderDropDownItem>
                <HeaderDropDownItem>Blacklisted Companies</HeaderDropDownItem>
                <HeaderDropDownItem>Help &amp; Support</HeaderDropDownItem>
                <HeaderDropDownItem>Log Out</HeaderDropDownItem>
            </HeaderDropDownMenu>
        )
    }

    renderSlider() {

        let text = [
            'Our Account Management team is comprised of highly motivated, experienced marketing professionals dedicated to providing our clients with the highest quality of service.',
            ' We are seeking a candidate who is career-minded, professional and responsible to manage digital and print media campaigns and partnerships with established clients.'
        ];

        let additionElements = (
            <CardGlassdoor
                name="Rakuten Global"
                rakutten="http://rakutten.com"
                facebook="http://facebook.com"
                linkedin="http://linkedin.com"
                twitter="http://twitter.com"
                logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/r-logo-d6afdf1a4e.png"
                ratingImage="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/glassdoor-stars-4c66461321.jpg"
                ratingCount={299}
                headquarters="New York, NY"
                companyType="Online Media"
                ofEmployees="500–1000"
                founded="1982"
            />
        )

        return (
            <Carousel openCard={1}>
                <CardClose
                    name="New York Times"
                    logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/nyt-logo-fc1d1f36c0.png"
                    title="Media Manager"
                    location="New York, NY"
                    match={97}
                    salary="$50–100K"
                    experience="5–10 years"
                    empoyment="Full-time"
                    text={text}
                    background="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/card-image-ee8e9932ad.jpg"
                />
                <CardOpen
                    name="Rakuten Global"
                    logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/r-logo-d6afdf1a4e.png"
                    title="Media Manager"
                    location="New York, NY"
                    match={97}
                    salary="$50–100K"
                    experience="5–10 years"
                    empoyment="Part-time"
                    degree="Bachelor’s"
                    text={text}
                    additionElements={additionElements}
                    background="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/r-bg-f0f475fed5.jpg"
                >
                    <DescriptiveParagraph>
                        Our Account
                        Management team is comprised of highly motivated, experienced marketing
                        professionals dedicated to providing our clients with the highest quality of
                        service.
                    </DescriptiveParagraph>
                    <DescriptiveParagraph>
                        We
                        are seeking a candidate who is career-minded, professional and responsible to
                        manage digital and print media campaigns and partnerships with established
                        clients.
                    </DescriptiveParagraph>
                    <DescriptiveParagraph>
                        Rakuten Global is a leading advertising agency that specializes in gaming,
                        tourism and destination marketing. With unmatched media buying expertise in both
                        traditional media and all digital media, Catalyst is looking for that right
                        person who is wanting to take their career to the next level.
                    </DescriptiveParagraph>
                    <DescriptiveParagraph>
                        The Media
                        Planner/Buyer’s responsibility is to execute and manage all types of media
                        programs, as well prepare campaign performance reports and analytics.&nbsp; You
                        would work to maintain and negotiate media buys in television, radio, digital,
                        print and out-of-home media across a variety of national and local
                        markets.&nbsp; You would help prepare budgets, estimates and review analytics to
                        accomplish client objectives and strategies.
                    </DescriptiveParagraph>
                    <div className="card__detail">
                        <DescriptiveList title="Responsibilities">
                            <DescriptiveListItem>
                                Manage the day-to-day operations,
                                including media research and analysis, planning, buying,
                                campaign administration and reporting
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Interact with outside vendors and
                                external business partners regarding various facets of client
                                media activity, such as assembly of media authorizations,
                                billing, insertion orders and report procurements
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Negotiate with sales representatives from
                                magazines, outdoor advertising vendors, newspapers, digitalvehicles
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Communicate with clients on media issues and recommendations
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Prepare and update media flowcharts and purchase authorizations
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Processing monthly station/network invoices for payment
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Create buys in media system (ie: STRATA)
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Maintain organized buy records
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Prepare and send traffic to mediaoutlets
                            </DescriptiveListItem>
                        </DescriptiveList>
                        <DescriptiveList title={<span>Skills &amp; Requirements</span>}>
                            <DescriptiveListItem>
                                4-year college degree – Marketing,
                                Communications or Advertising Degree or emphasis preferred
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                3-5 years media buying/planning experience with a variety of media
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Computer proficiency; advanced knowledge of Excel is a plus
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Proactive problem-solving ability
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Highly organized, with the ability to multi-task in a fast paced environment
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Meticulous attention to detail and accuracy
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Excellent communication skills, both written and verbal
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Strong organizational and analytical skills
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Understanding of marketing fundamentals
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Deadline-oriented with a sense of urgency
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Ability to collaborate well with staff, clients, and vendors at all levels
                            </DescriptiveListItem>
                            <DescriptiveListItem>
                                Self-starter, high energy, assertive, take charge personality.
                            </DescriptiveListItem>
                        </DescriptiveList>
                    </div>
                </CardOpen>
                <CardClose
                    name="New York Times"
                    logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/nyt-logo-fc1d1f36c0.png"
                    title="Media Manager"
                    location="New York, NY"
                    match={97}
                    salary="$50–100K"
                    experience="5–10 years"
                    empoyment="Full-time"
                    text={text}
                    background="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/card-image-ee8e9932ad.jpg"
                />
                <CardClose
                    name="New York Times"
                    logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/nyt-logo-fc1d1f36c0.png"
                    title="Media Manager"
                    location="New York, NY"
                    match={97}
                    salary="$50–100K"
                    experience="5–10 years"
                    empoyment="Full-time"
                    text={text}
                    background="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/card-image-ee8e9932ad.jpg"
                />
                <CardClose
                    name="New York Times"
                    logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/nyt-logo-fc1d1f36c0.png"
                    title="Media Manager"
                    location="New York, NY"
                    match={97}
                    salary="$50–100K"
                    experience="5–10 years"
                    empoyment="Full-time"
                    text={text}
                    background="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/card-image-ee8e9932ad.jpg"
                />
                <CardClose
                    name="New York Times"
                    logo="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/nyt-logo-fc1d1f36c0.png"
                    title="Media Manager"
                    location="New York, NY"
                    match={97}
                    salary="$50–100K"
                    experience="5–10 years"
                    empoyment="Full-time"
                    text={text}
                    background="https://projects.softfacade.com/www/pumpt-web-app/assets/img/summary-head/card-image-ee8e9932ad.jpg"
                />
            </Carousel>
        )
    }

    render() {
        let tabList = [
            {
                label: 'All Matches',
                icon: <use><MatchesIcon className="icon_inline"/></use>,
                onClick: e => { console.log('Matches [All]')},
                active: true
            },
            {
                label: 'Bookmarked',
                icon: <use><BookmarkFill className="icon_inline"/></use>,
                onClick: e => { console.log('Matches [Bookmark]')},
                active: false
            },
            {
                label: 'Not interested',
                icon: <use><DeclineIcon className="icon_inline"/></use>,
                onClick: e => { console.log('Matches [Not interested]')},
                active: false
            }
        ]
        return (
            <Wrapper id='onboarding-candidate'>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12'>
                            <HeaderFull
                                logo={logoImage}
                                title="Matches"
                                menu={<a href="#">Messages</a>}
                                addition={this.renderHeaderAdditionPart()}
                            />
                        </div>
                    </div>
                </div>
                <div class='container slider-container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12'>
                            {this.renderSlider()}
                        </div>
                    </div>
                </div>
                <TabBar tabs={tabList}/>
            </Wrapper>
        )
    }
}

export default OnboardingCandidate
