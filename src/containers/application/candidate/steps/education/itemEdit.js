import React, { Component, PropTypes } from 'react'

class EducationsItemEdit extends Component {
    render() {
        const { schoolName, degree } = this.props

        return(
            <div>
                <div>
                    <input
                    type="text"
                    value={schoolName}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={degree}
                    />
                </div>
            </div>
        )
    }
}

EducationsItemEdit.propTypes = {
    initialContent: PropTypes.Object
}

EducationsItemEdit.defaultProps = {
    initialContent: {}
}

export default EducationsItemEdit
