import React, { Component, PropTypes } from 'react'

class EducationsItemDisplay extends Component {
    render() {
        const { schoolName, degeree } = this.props

        return(
            <div>
                <h4>{schoolName}</h4>
                <p>{degree}</p>
            </div>
        )
    }
}

EducationsItemDisplay.propTypes = {
    content: PropTypes.Object
}

EducationsItemDisplay.defaultProps = {
    content: {}
}

export default EducationsItemDisplay
