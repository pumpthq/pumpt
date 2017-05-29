import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form'
import { Location, EnumSelector, TextArea, TextInput, FieldArray } from 'components/form/inputs'

import QuoteIcon from 'components/icons-application/quote'
import ChainIcon from 'components/icons-application/chain'
import Pin from 'components/icons-application/pin'
import Description from 'components/icons-application/description'
import Social from 'components/icons-application/social'
import Photos from 'components/icons-application/photos'

import LinkedInIcon from 'components/icons-application/linkedIn'
import TwitterIcon from 'components/icons-application/twitter'
import FacebookIcon from 'components/icons-application/facebook'
import './style.less'

@reduxForm({
    form: 'company-application',
    fields: [
        'socialMedia.websiteUrl',
        'socialMedia.linkedInUrl',
        'socialMedia.twitterAcc',
        'socialMedia.faceBookUrl',

        'locationHeadquarters',
        'locationHeadquarters.city',
        'locationHeadquarters.state',

        'locationOffices[]',
        'locationOffices[].city',
        'locationOffices[].state',

        'description',
        'quoteOrMotto',

        'images[]',

        ]
})

export default class ApplicationForm extends Component {
    render() {
      const {
        fields: { quoteOrMotto, description, locationHeadquarters, locationOffices, socialMedia, images },
        handleSubmit,
        resetForm,
        submitting,
        } = this.props;

      return (

                <form onSubmit={handleSubmit} className="company-application-form text-input-underlined">
                  <CardDivider/>

                  <Social/><p className="icon-item">Website & Social Media</p>
                  <div className="social-links">
                    <ChainIcon/><TextInput field={socialMedia.websiteUrl} label="Website"/>
                    <LinkedInIcon/><TextInput field={socialMedia.linkedInUrl} label="LinkedIn"/>
                    <TwitterIcon/><TextInput field={socialMedia.twitterAcc} label="Twitter"/>
                    <FacebookIcon/><TextInput field={socialMedia.faceBookUrl} label="Facebook"/>
                    <CardDivider/>
                  </div>

                  <Pin/><p className="icon-item">Location</p>
                  <div className="location">
                    <Location field={locationHeadquarters} label="Headquarters" />
                    <CardDivider/>

                    <FieldArray field={locationOffices} label="Offices" component={Location} />
                    <CardDivider/>
                  </div>

                  <Description/>
                    <TextInput field={description} label="Description" classItm="description" classLb="description-label" classInp="description-input"/>
                    <CardDivider/>

                  <QuoteIcon/>
                    <TextInput field={quoteOrMotto} label="Quote Or Motto" classItm="quote" classLb="quote-label" classInp="quote-input"/>
                    <CardDivider/>

                  <Photos/>
                    <FieldArray field={images} label="Photos" component={ImageEntry} classFA="photos-fa" classFABtn="photos-btn" />
                    <CardDivider/>

                  <div>
                    <button type="submit" disabled={submitting}
                            className="mdl-button button invisible-mobile button_type_colored button_size_m company-submit"
                    >
                      {submitting ? <i/> : <i/>} Save
                    </button>
                    {/* <button type="button" disabled={submitting} onClick={resetForm}>
                     Clear Values
                     </button> */}
                  </div>
                </form>

      )
  }
}

const ImageEntry = props => {
    const { field } = props
    return (
        <div>
            [image entry placeholder]
        </div>
    )
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)
