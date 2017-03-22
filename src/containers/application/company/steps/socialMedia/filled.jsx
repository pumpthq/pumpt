import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem';
import LinkedInIcon from './../../../../../components/icons/linkedIn';
import ChainIcon from './../../../../../components/icons/chain';
import TwitterIcon from './../../../../../components/icons/twitter';
import FacebookIcon from './../../../../../components/icons/facebook';
import { formatUrl } from './../../../../../utils';

const AddSocialMediaFilled = ({
    websiteUrl,
    linkedInProfileUrl,
    twitterUsername,
    facebookProfileUrl,
}) =>  {
    let websiteFormatted = formatUrl(websiteUrl);
    let linkedInFormatted = formatUrl(linkedInProfileUrl);
    let twitterFormatted = formatUrl(twitterUsername, true);
    let facebookFormatted = formatUrl(facebookProfileUrl);

    return(
    <DescriptionListItem>
        <div className="list__item-general social-block">
            {websiteUrl ?
                <p className="text text_size_s social-block__item">
                    <ChainIcon />
                    <span className="icon__text"><a href={websiteFormatted.url} target="_blank">{websiteFormatted.displayAs}</a></span>
                </p> :
                null
            }
            {linkedInProfileUrl ?
                <p className="text text_size_s social-block__item">
                    <LinkedInIcon />
                    <span className="icon__text"><a href={linkedInFormatted.url} target="_blank">LinkedIn profile</a></span>
                </p> :
                null
            }
            {twitterUsername ?
                <p className="text text_size_s social-block__item">
                    <TwitterIcon />
                    <span className="icon__text"><a href={twitterFormatted.url} target="_blank">{twitterFormatted.displayAs}</a></span>
                </p> :
                null
            }
            {facebookProfileUrl ?
                <p className="text text_size_s social-block__item">
                    <FacebookIcon />
                    <span className="icon__text"><a href={facebookFormatted.url} target="_blank">FaceBook profile</a></span>
                </p> :
                null
            }
        </div>
    </DescriptionListItem>
);

};

AddSocialMediaFilled.propTypes = {
    websiteUrl: PropTypes.string,
    linkedInProfileUrl: PropTypes.string,
    twitterUsername: PropTypes.string,
    facebookProfileUrl: PropTypes.string,
};

AddSocialMediaFilled.defaultProps = {};

export default connect(
    (state) => {
        const {
            websiteUrl,
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl,
        } = state.applicationCompany.socialMedia;

        return {
            websiteUrl,
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl,
        };
    }
)(AddSocialMediaFilled);
