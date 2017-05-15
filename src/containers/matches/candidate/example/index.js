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

        return (
            <Carousel>
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
