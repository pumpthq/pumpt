import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import EducationsItemDisplay from './itemDisplay'

@connect(
    function mapStateToProps(state, ownProps) {
        const { educations } = state.applicationCandidate

        return {
            educations: educations
        }
    }
)
class EducationBlockDisplay extends Component {
    render() {
        const { educations } = this.props

        return(
            <div>
                {educations.map((education) => {
                    return(
                        <EducationsItemDisplay
                            content={education}
                        />
                    )
                })}
            </div>
        )
    }
}

EducationBlockDisplay.propTypes = {
    educations: PropTypes.Array
}

EducationBlockDisplay.defaultProps = {
    educations: []
}

export default EducationBlockDisplay
