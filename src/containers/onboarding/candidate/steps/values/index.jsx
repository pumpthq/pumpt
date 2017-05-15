import React, { Component, PropTypes } from 'react';
import Panel from '../../../../../components/main/panel';
import { H1 } from '../../../../../components/main/heading';
import on3Image from '../../../../../img/sprites-svg/on3.svg';
import ValuesForm from './form';
import OnboardingCandidateLinker from './../linker';

class ValuesStep extends Component {
    componentDidMount() {
        this.props.scrollTop();
    }

    render() {
        return (
            <div className="container">
                <div className="row row-padding-bigger">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper">
                        <section class="column column_size_l">
                            <Panel paddingBig>
                                <H1 noGutter typeFour className="row">
                                    <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10">What factors are most important to you in assessing a company?</span>
                                <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <span className="image__wrapper">
                                        <img className="icon icon-onboarding-2" src={on3Image} />
                                    </span>
                                </span>
                                </H1>
                                <p class="onboarding__tip">Select your top 3 choices.</p>
                                <ValuesForm />
                            </Panel>
                        </section>
                        <aside className="column column_size_s">
                            <OnboardingCandidateLinker />
                        </aside>
                    </div>
                </div>
            </div>
        );
    }
}

ValuesStep.propTypes = {
    scrollTop: PropTypes.func,
};

export default ValuesStep;
