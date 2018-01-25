import React, {Component, PropTypes} from 'react'
import Panel from 'components/main/panel'
import {H1} from 'components/main/heading'

import CompanyFinalForm from './form'

class CompanyPrototypeFinalStep extends Component {
    render() {
        const { onSubmit, OnboardingLinker } = this.props
        
        return (
            <div class='container'>
                <div class='row row-padding-bigger'>
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper'>
                        <section class='column column_size_l'>
                            <Panel paddingBig>
                                <H1 noGutter typeFour class='row'>
                                    <span class='onboarding-header col-lg-10 col-md-10 col-sm-10 col-xs-12'>Set up your password to improve security.</span>
                                    <span class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                                        <span class="image__wrapper"></span>
                                    </span>
                                </H1>
                                <p class='onboarding-header text text_after_big-head text_size_xs'>
                                    Password must be at least 8 characters long.
                                    To make password more secure, use upper and lowercase letters, digits, and symbols.
                                </p>
                                <CompanyFinalForm onSubmit={onSubmit}/>
                            </Panel>
                        </section>
                        <aside class='column column_size_s'>
                            <OnboardingLinker/>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
}

CompanyPrototypeFinalStep.propTypes = {
    onSubmit : PropTypes.func,
    OnboardingLinker : PropTypes.func
}

export default CompanyPrototypeFinalStep
