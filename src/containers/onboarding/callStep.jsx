import React, {PropTypes} from 'react'

const CallStep = ({ activeOnStep, onboardingState, To }) => {
    const { progress, step } = onboardingState
    const isActive = step === activeOnStep
    const isFilled = progress.indexOf(activeOnStep) > -1
    const isEnabled = (isActive && !isFilled) || (!isActive && isFilled)
    const isVisited = true

    return (
        <To {...{
            isActive,
            isFilled,
            isEnabled,
            isVisited
        }} />
    )
}

CallStep.propTypes = {
    activeOnStep : PropTypes.string,
    onboardingState : PropTypes.object,
    To : PropTypes.func
}

export default CallStep
