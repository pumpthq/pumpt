import React, {Component} from 'react'
import Panel from './../../../../../components/main/panel'
import {H1} from './../../../../../components/main/heading'

import SocialMediaForm from './form'
import OnboardingCompanyLinker from './../linker'

class SocialMediaStep extends Component {
    render() {
        return (
            <div class='container'>
                <div class='row row-padding-bigger'>
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper'>
                        <section class='column column_size_l'>
                            <Panel paddingBig>
                                <H1 noGutter typeFour class='row'>
                                    <span class='onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-12'>Please provide your company’s website page and/or any active social media accounts</span>
                                    <span class='col-lg-2 col-md-2 col-sm-2 hidden-xs'>
                                        <span class='image__wrapper'>
                                            
                                        </span>
                                    </span>
                                </H1>
                                <SocialMediaForm/>
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

export default SocialMediaStep
