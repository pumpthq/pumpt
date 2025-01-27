import React, {Component, PropTypes} from 'react';
import Panel from '../../../../../components/main/panel';
import {H1} from '../../../../../components/main/heading';
import on3Image from '../../../../../img/sprites-svg/on3.svg';
import ValuesForm from './form';
import OnboardingCompanyLinker from './../linker';

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
                                    <span className="onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-10">Which of the following values best represent your company?</span>
                                <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <span className="image__wrapper">
                                        <img className="icon icon-onboarding-2" src={on3Image} />
                                    </span>
                                </span>
                                </H1>
                                <p class="onboarding__tip">Select the top 3 qualities.</p>
                                <ValuesForm />
                            </Panel>
                        </section>
                        <aside className="column column_size_s">
                            <OnboardingCompanyLinker />
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
