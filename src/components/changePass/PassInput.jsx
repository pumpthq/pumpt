import React, { Component, PropTypes } from 'react';

import { OnboardingInput } from '../onboarding';

export default class PassInput extends Component {
    static propTypes = {
        label: PropTypes.string,
        type: PropTypes.string,
        password: PropTypes.object,
    }

    render() {
        const { label, type, password } = this.props;

        return (
            <fieldset
                className="mdl-textfield mdl-js-textfield textfield textfield_size_s is-upgraded"
            >
                <OnboardingInput
                    className="mdl-textfield__input textfield__input"
                    textFieldSize="m"
                    {...password}
                    label={label}
                    type={type}
                />
            </fieldset>
        );
    }
}
