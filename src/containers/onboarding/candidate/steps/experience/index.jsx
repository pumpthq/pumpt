import React, { Component, PropTypes } from 'react';
import Panel from '../../../../../components/main/panel';
import { H1 } from '../../../../../components/main/heading';
import ExperienceForm from './form';
import OnboardingCandidateLinker from './../linker';

class ExperienceStep extends Component {
    componentDidMount() {
        this.props.scrollTop();
    }

    render() {
        return (
            <div class="container">
                <div class="row row-padding-bigger">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper">
                        <section class="column column_size_l">
                            <Panel paddingBig>
                                <H1 noGutter typeFour class="row">
                                    <span class="onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-10">What is your current years of industry experience?</span>
                                    <span class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></span>
                                    {/* TODO : span class */}
                                </H1>
                                <ExperienceForm />
                            </Panel>
                        </section>
                        <aside class="column column_size_s">
                            <OnboardingCandidateLinker />
                        </aside>
                    </div>
                </div>
            </div>
        );
    }
}

ExperienceStep.propTypes = {
    scrollTop: PropTypes.func,
};

export default ExperienceStep;
