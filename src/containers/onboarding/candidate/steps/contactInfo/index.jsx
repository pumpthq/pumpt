import React from 'react';
import Panel from './../../../../../components/main/panel';
import {H1} from './../../../../../components/main/heading';
import on1Image from './../../../../../img/sprites-svg/on1.svg';
import ContactInfoForm from './form';
import OnboardingCandidateLinker from './../linker';

const ContactInfoStep = () => (
    <div className="container">
        <div className="row row-padding-bigger">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper">
                <section className="column column_size_l">
                    <Panel paddingBig>
                        <H1 noGutter typeFour className="row">
                            <span className="onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-10">Hello. Tell us a&nbsp;little about&nbsp;yourself.</span>
                                    <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        <span className="image__wrapper">
                                            <img
                                                className="icon icon-onboarding-1"
                                                role="presentation"
                                                src={on1Image}
                                            />
                                        </span>
                                    </span>
                        </H1>
                        <ContactInfoForm />
                    </Panel>
                </section>
                <aside className="column column_size_s">
                    <OnboardingCandidateLinker />
                </aside>
            </div>
        </div>
    </div>
);

export default ContactInfoStep;
