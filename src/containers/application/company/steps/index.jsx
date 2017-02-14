import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AccordionLayout, AccordionItem } from '../../../../components/application/accordion';
import SocialMediaFilled from './socialMedia/filled';
import SocialMediaActive from './socialMedia/active';
import AddLocationsActive from './addLocations/active';
import AddLocationsFilled from './addLocations/filled';
import AddDescriptionActive from './addDescription/active';
import AddDescriptionFilled from './addDescription/filled';
import AddQuoteOrMottoActive from './addQuoteOrMotto/active';
import AddQuoteOrMottoFilled from './addQuoteOrMotto/filled';
import AddPhotosActive from './addPhotos/active';
import SocialIcon from './../../../../components/icons/social';
import PinIcon from './../../../../components/icons/pin';
import DescriptionIcon from './../../../../components/icons/description';
import QuoteIcon from './../../../../components/icons/quote';
import PhotosIcon from './../../../../components/icons/photos';
import ImportFromLinkedInButton from './../parts/ImportFromLinkedInButton';
import {
    SOCIAL_MEDIA_STEP,
    LOCATION_STEP,
    DESCRIPTION_STEP,
    QUOTE_OR_MOTTO_STEP,
    PHOTO_STEP,
} from './../../../../constants/applicationCompany';
import {
    showSocialMediaStep,
    cancelSocialMediaStep,
    showLocationStep,
    cancelLocationStep,
    showDescriptionStep,
    cancelDescriptionStep,
    showQuoteOrMottoStep,
    cancelQuoteOrMottoStep,
    showAddPhotoStep,
    cancelPhotoStep,
} from './../../../../actions/applicationCompany';
import ApplicationAccordionPrototype from './../../accordionPrototype';
@connect(
    (state) => {
        const { progress, active } = state.applicationCompany;

        return {
            filled: progress.slice(),
            active: active.slice().pop(),
        };
    },
    (dispatch) => ({ dispatch })
)
class ApplicationCompanyAccordion extends ApplicationAccordionPrototype {
    constructor(props) {
        super(props);

        this.isActiveOrFilled = this.isActiveOrFilled.bind(this);
        this.syncWithStore = this.syncWithStore.bind(this);
    }

    syncWithStore() {
        const nextState = {
            socialMedia: this.isActiveOrFilled({ constant: SOCIAL_MEDIA_STEP }),
            location: this.isActiveOrFilled({ constant: LOCATION_STEP }),
            description: this.isActiveOrFilled({ constant: DESCRIPTION_STEP }),
            quoteOrMotto: this.isActiveOrFilled({ constant: QUOTE_OR_MOTTO_STEP }),
            photos: this.isActiveOrFilled({ constant: PHOTO_STEP }),
        };

        return nextState;
    }

    render() {
        const { dispatch } = this.props;
        const { socialMedia, location, description, quoteOrMotto, photos } = this.syncWithStore();
        return (
            <AccordionLayout importButton={<ImportFromLinkedInButton />}>

                <AccordionItem
                    defaultTitle="Website & Social Media"
                    title="Website & Social Media"
                    iconElement={<SocialIcon />}
                    status={socialMedia}
                    childrenActive={<SocialMediaActive />}
                    childrenFilled={<SocialMediaFilled />}
                    onClick={() => dispatch(showSocialMediaStep())}
                    onEdit={() => dispatch(showSocialMediaStep())}
                    onWhenFilledClick={() => dispatch(showSocialMediaStep())}
                    onWhenActiveClick={() => dispatch(cancelSocialMediaStep({}))}
                />

                <AccordionItem
                    iconElement={<PinIcon />}
                    title="Locations"
                    defaultTitle="Locations"
                    status={location}
                    childrenActive={<AddLocationsActive />}
                    childrenFilled={<AddLocationsFilled />}
                    onClick={() => dispatch(showLocationStep())}
                    onEdit={() => dispatch(showLocationStep())}
                    onWhenFilledClick={() => dispatch(showLocationStep())}
                    onWhenActiveClick={() => dispatch(cancelLocationStep())}
                />

                <AccordionItem
                    iconElement={<DescriptionIcon />}
                    title="Add Description"
                    defaultTitle="Description"
                    status={description}
                    childrenActive={<AddDescriptionActive />}
                    childrenFilled={<AddDescriptionFilled />}
                    onClick={() => dispatch(showDescriptionStep())}
                    onEdit={() => dispatch(showDescriptionStep())}
                    onWhenFilledClick={() => dispatch(showDescriptionStep())}
                    onWhenActiveClick={() => dispatch(cancelDescriptionStep())}
                />

                <AccordionItem
                    iconElement={<QuoteIcon />}
                    title="Add Quote or Motto"
                    defaultTitle="Quote or Motto"
                    status={quoteOrMotto}
                    childrenActive={<AddQuoteOrMottoActive />}
                    childrenFilled={<AddQuoteOrMottoFilled />}
                    onClick={() => dispatch(showQuoteOrMottoStep())}
                    onEdit={() => dispatch(showQuoteOrMottoStep())}
                    onWhenFilledClick={() => dispatch(showQuoteOrMottoStep())}
                    onWhenActiveClick={() => dispatch(cancelQuoteOrMottoStep())}
                />

                <AccordionItem
                    iconElement={<PhotosIcon />}
                    title="Add Photos"
                    defaultTitle="Photos"
                    status={photos}
                    childrenActive={<AddPhotosActive />}
                    childrenFilled={<AddPhotosActive />}
                    onClick={() => dispatch(showAddPhotoStep())}
                    onEdit={() => {}}
                    onWhenFilledClick={() => {}}
                    onWhenActiveClick={() => {}}
                />

            </AccordionLayout>
        )
    }
}

ApplicationCompanyAccordion.propTypes = {
    dispatch: PropTypes.func,
};
ApplicationCompanyAccordion.defaultProps = {};

export default ApplicationCompanyAccordion;
