import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form'
import { Location, EnumSelector, TextArea, TextInput} from 'components/form/inputs'

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
                  <div>
										<div className="application-item">
											<Location  field={locationHeadquarters} label="Headquarters" />
										</div>
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

                    <UploadArray field={images} label="Photos" component={ImageEntry} />

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

import ImageUploader from 'components/ImageUploader'
import {FileImage} from 'components/icons'

export const UploadArray = (props) => {
    const { field, label } = props
    const Item = props.component
    return (
        <div class="image-upload">
            <ImageUploader
                label="Image"
                iconPhoto={<FileImage size='2x'/>}
                onSuccessAction={(data) => {
                    field.addField(data.id); // ⚠️ this is a hack to work around for building an action for the reducer!
                    return {type:"FAKE_ACTION_HACK_FOR_ADDING_IMAGE_TO_FIELD_ARRAY"}

                    //🌟 below is the correct way, to build and return the action dispatched by `field.addField(data.id)`
                    // return {
                    //     type: "redux-form/ADD_ARRAY_VALUE",
                    //     path: "images",
                    //     fields: [""],
                    //     value: data.id,
                    //     form: "company-application"
                    // }

                }}
            />
            {field.map((child, index) =>
                <div key={index}>
                    <Item field={child} />
                    <button type="button" onClick={() => {
                      field.removeField(index)  // remove from index
                    }}><i>Remove</i>
                    </button>
                </div>
            )}
        </div>
    )
}

const FieldArray = (props) => {
    const { field, label } = props
    const Item = props.component
    return (
        <div className="application-item">
            <button className="application-item-button" type="button" onClick={() => {
              field.addField()    // pushes empty child field onto the end of the array
            }}><i/>
						{field.length === 0 && 'Add'} {label}
            </button>

            {field.map((child, index) =>
                <div key={index} className="info-block">
                    <Item field={child} />
                    <button className="remove-entry" type="button" onClick={() => {
                      field.removeField(index)  // remove from index
                    }}><i>Remove</i>
                    </button>
                </div>
            )}

					{field.length > 0 && <button className="add-entry mdl-button" type="button" onClick={() => {
							field.addField()    // pushes empty child field onto the end of the array
						}}>Add
					</button>}
        </div>
    )
}

import {apiImage} from 'components/helpers'
const ImageEntry = props => {
    const { field } = props
    return (
        <img src={apiImage(field.value)} className="image image_width_full"/>
    )
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)
