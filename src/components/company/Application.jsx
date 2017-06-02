import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form'
import { Location, EnumSelector, TextArea, TextInput, FieldArray } from 'components/form/inputs'

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

                    <TextInput field={socialMedia.websiteUrl} label="Website"/>
                    <TextInput field={socialMedia.linkedInUrl} label="LinkedIn"/>
                    <TextInput field={socialMedia.twitterAcc} label="Twitter"/>
                    <TextInput field={socialMedia.faceBookUrl} label="Facebook"/>
                    <CardDivider/>

                    <Location field={locationHeadquarters} label="Headquarters" />

                    <CardDivider/>

                    <FieldArray field={locationOffices} label="Offices" component={Location} />

                    <CardDivider/>

                    <TextInput field={description} label="Description"/>

                    <CardDivider/>

                    <TextInput field={quoteOrMotto} label="Quote Or Motto"/>

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
        <div>
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

import {apiImage} from 'components/helpers'
const ImageEntry = props => {
    const { field } = props
    return (
        <img src={apiImage(field.value)} className="image image_width_full"/>
    )
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)
