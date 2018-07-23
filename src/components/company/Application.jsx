import React from 'react';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
// Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField';


import QuoteIcon from 'components/icons-application/quote';
import ChainIcon from 'components/icons-application/chain';
import Pin from 'components/icons-application/pin';
import Description from 'components/icons-application/description';
import Social from 'components/icons-application/social';

import LinkedInIcon from 'components/icons-application/linkedIn';
import TwitterIcon from 'components/icons-application/twitter';
import FacebookIcon from 'components/icons-application/facebook';
// Actions
import { updateCompany } from 'actions/applicationCompany';
// Field-level Validations & Normalizations
import { url } from 'components/main/form/validations';
import { normalizeTwitter } from 'components/main/form/normalizations';
import { renderField } from 'components/form/helpers';

import './style.less';

const CardDivider = () => (<hr className="my-5"/>);

// Form
let CompanyApplicationForm = props => {
  const { handleSubmit, submitting, error, invalid,
    submitSucceeded, pristine } = props;
  const submitDisabled = invalid || submitting;

  return (
    <form onSubmit={handleSubmit} className="company-application-form">
      <CardDivider />

      <FieldArray name="social" component={renderSocial} />
      <CardDivider />

      <FieldArray name="locationOffices" component={renderOfficeLocations} />
      <CardDivider />

      <h6>Description</h6>
      <Field
        name="description" component="textarea" class="text-area"
        placeholder="Tell us More About Your Company..."
      />

    <div className="col-12 py-3"></div>

    <h6>Quote Or Motto</h6>
    <Field
      name="quoteOrMotto" component="textarea" class="text-area"
      placeholder="Your Company's Motto..."
    />

  <div>
    {error && <span className="textfield__error">{error}</span>}
    <br />
    <div class="text-center pt-5">
      <button
        type="submit" disabled={submitDisabled}
        className="button_type_colored button_size_l mb-5"
      >
        Save
      </button>
    </div>
  </div>
    </form>
  );
};

const renderSocial = () => (
  <div className="application-item">
    <h6>Social Media</h6>
    <div className="info-block social-media-block">
      <div className="row">
        <div className="col-auto pr-0">
          <ChainIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.websiteUrl"
            type="text"
            component={renderField}
            label="Website"
            className="social-application-item"
            validate={url}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto pr-0">
          <LinkedInIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.linkedInUrl"
            type="text"
            component={renderField}
            label="LinkedIn"
            className="social-application-item"
            validate={url}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto pr-0">
          <TwitterIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.twitterAcc"
            type="text"
            className="social-application-item"
            component={renderField}
            normalize={normalizeTwitter}
            label="Twitter"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto pr-0">
          <FacebookIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.faceBookUrl"
            type="text"
            component={renderField}
            className="social-application-item"
            label="Facebook"
            validate={url}
          />
        </div>
      </div>
    </div>
  </div>
);

const renderOfficeLocations = ({ fields, label, meta: { error } }) => (
  <div className="application-item">
    <h6>Office Locations</h6>
    <div className="info-block">
      <div className="row">
        <div className="col-12">
          <Field
            name="headquartersLocation"
            component={PlaceField}
            label="Headquarters"
          />
        </div>
        {fields.map((officeLocation, index) => (
          <div key={index} className="col-12 col-md-6">
              <Field
                name={`${officeLocation}.location`}
                component={PlaceField}
                label="Office Location"
              />
              <button
                className="remove-entry button_type_colored button_size_s px-0 float-right" type="button" onClick={() => {
                  fields.remove(index);
                }}
              >Remove
              </button>
          </div>
        ))}
      </div>
    </div>
    {error && <li className="error">{error}</li>}

    <button
      className="button_type_colored button_size_l" type="button" onClick={() => {
        fields.push();
      }}
    >Add
    </button>
  </div>
);

// Define Form
CompanyApplicationForm = reduxForm({
  form: 'companyApplicationForm',
  enableReinitialize: true,
})(CompanyApplicationForm);

// Export Form
export default CompanyApplicationForm;
