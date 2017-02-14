import React, { Component, PropTypes } from 'react'
import Panel from './../../../../../components/main/panel'
import { H1 } from './../../../../../components/main/heading'
import { OnboardingInput } from './../../../../../components/onboarding'
import on5Image from './../../../../../img/sprites-svg/on5.svg'

import FoundationYearForm from './form'
import OnboardingCompanyLinker from './../linker'

class FoundationYearStep extends Component {
    componentDidMount() {
        this.props.scrollTop()
    }

    render(){
        return (
            <div class='container'>
                <div class='row row-padding-bigger'>
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper'>
                        <section class='column column_size_l'>
                            <Panel paddingBig>
                                <H1 noGutter typeFour class='row'>
                                    <span class='col-lg-10 col-md-10 col-sm-10 col-xs-10'>When was your company founded?</span>
                                    <span class='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                                        <span class='image__wrapper'>
                                            <img class='icon icon-onboarding-5' src={on5Image}/>
                                        </span>
                                    </span>
                                </H1>
                                    <FoundationYearForm/>
                            </Panel>
                        </section>
                        <aside class='column column_size_s'>
                            <OnboardingCompanyLinker/>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
}

FoundationYearStep.propTypes = {
    scrollTop : PropTypes.func
}

export default FoundationYearStep
