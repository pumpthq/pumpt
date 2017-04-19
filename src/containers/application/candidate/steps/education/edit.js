import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import EducationsItemEdit from './itemEdit'

@connect(
    function mapStateToProps(state, ownProps) {
        const { educations } = state.applicationCandidate

        return {
            educations
        }
    }
)
class EducationBlockEdit extends Component {
    render() {
        const { educations } = this.props

        return(
            <div>
                <div>
                    {educations.map((education) => {
                        return(
                            <EducationsItemEdit
                                initialContent={education}
                            />
                        )
                    })}
                </div>
                <div><h2>Add form</h2></div>
            </div>
        )
    }
}

EducationBlockEdit.propTypes = {
    educations: PropTypes.Array
}

EducationBlockEdit.defaultProps = {
    educations: []
}

export default EducationBlockEdit
