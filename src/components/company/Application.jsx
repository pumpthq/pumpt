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
        } = this.props

      return (

                <form onSubmit={handleSubmit}>

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

                    <FieldArray field={images} label="Photos" component={ImageEntry} />

                    <CardDivider/>

                  <div>
                    <button type="submit" disabled={submitting}>
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
