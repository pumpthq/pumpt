import React, {Component, PropTypes} from 'react'
import Panel from '../../../../../components/main/panel'
import {H1} from '../../../../../components/main/heading'
import on4Image from '../../../../../img/sprites-svg/on4.svg'
import JobTitleContent from './content'
import OnboardingCandidateLinker from './../linker'

class JobTitleStep extends Component {
    componentDidMount() {
        this.props.scrollTop()
    }

    render() {
        return (
            <div class='container'>
                <div class='row row-padding-bigger'>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper">
                        <section class='column column_size_l'>
                            <Panel paddingBig>
                                <H1 noGutter typeFour class='row'>
                                    <span class='onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-10'>What is your job title?</span>
                                <span class='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                                    <span class='image__wrapper'>
                                        <img class='icon icon-onboarding-2' src={on4Image}/>
                                    </span>
                                </span>
                                </H1>

                                <JobTitleContent />
                                {/*<JobTitleForm/>*/}
                            </Panel>
                        </section>
                        <aside class='column column_size_s'>
                            <OnboardingCandidateLinker/>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
}

JobTitleStep.propTypes = {
    scrollTop : PropTypes.func
}

export default JobTitleStep
