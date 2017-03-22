import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import LinkedInIcon from './../../../../../components/icons/linkedIn'
import TwitterIcon from './../../../../../components/icons/twitter'
import FacebookIcon from './../../../../../components/icons/facebook'

import { formatUrl } from './../../../../../utils';


@connect(
    function mapStateToProps(state, ownProps) {
        const {
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl
        } = state.applicationCandidate.socialMedia

        return {
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl
        }
    }
)
class AddSocialFilled extends Component {
    render() {

        const {
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl
        } = this.props

        let linkedInFormatted = formatUrl(linkedInProfileUrl)
        let twitterFormatted = formatUrl(twitterUsername, true)
        let facebookFormatted = formatUrl(facebookProfileUrl)

        return (
            <DescriptionListItem>
                <div class="list__item-general social-block">
                    { linkedInProfileUrl ? <p class="text text_size_s social-block__item">
                        <LinkedInIcon/>
                        <span class="icon__text"><a href={linkedInFormatted.url} target="_blank">{linkedInFormatted.displayAs}</a></span>
                    </p> : '' }
                    { twitterUsername ? <p class="text text_size_s social-block__item">
                        <TwitterIcon/>
                        <span class="icon__text"><a href={twitterFormatted.url} target="_blank">{twitterFormatted.displayAs}</a></span>
                    </p> : '' }
                    { facebookProfileUrl ? <p class="text text_size_s social-block__item">
                        <FacebookIcon/>
                        <span class="icon__text"><a href={facebookFormatted.url} target="_blank">Facebook profile</a></span>
                    </p> : '' }
                </div>
            </DescriptionListItem>
        )
    }
}

AddSocialFilled.propTypes = {
    linkedInProfileUrl : PropTypes.string,
    twitterUsername : PropTypes.string,
    facebookProfileUrl : PropTypes.string
}

AddSocialFilled.defaultProps = {
    linkedInProfileUrl : null,
    twitterUsername : null,
    facebookProfileUrl : null
}

export default AddSocialFilled
