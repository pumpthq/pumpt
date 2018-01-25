import React, {Component, PropTypes} from 'react';
import Panel from '../../../../../components/main/panel';
import {H1} from '../../../../../components/main/heading';
import on5Image from '../../../../../img/sprites-svg/on5.svg';
import IncomeForm from './form';
import OnboardingCandidateLinker from './../linker';

class IncomeStep extends Component {
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
                                    <span className="onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-10">What is your current total compensation package?</span>
                                <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <span className="image__wrapper">
                                        <img className="icon icon-onboarding-2" src={on5Image} />
                                    </span>
                                </span>
                                </H1>
                                <IncomeForm />
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

IncomeStep.propTypes = {
    scrollTop: PropTypes.func,
};

export default IncomeStep;
