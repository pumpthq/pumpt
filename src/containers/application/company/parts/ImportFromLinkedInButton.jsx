import React, { Component, PropTypes } from 'react'
import LinkedInIcon from './../../../../components/icons/linkedIn'
import { connect } from 'react-redux'
import {
    IMPORT_COMPLETED
} from './../../../../constants/applicationCompany'
import {
    importStarted
} from './../../../../actions/applicationCompany'

@connect(
    function mapStateToProps(state) {
        const { importFromLinkedIn } = state.applicationCompany
        const isCompleted = importFromLinkedIn === IMPORT_COMPLETED

        return {
            isCompleted
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)
class ImportFromLinkedInButton extends Component {
    render() {
        const {
            dispatch,
            isCompleted
        } = this.props

        if (!isCompleted) {
            return (
                <button
                    type="button"
                    class='mdl-button button button_type_colored button_type_linkedin'
                    onClick={() => {
                        dispatch(importStarted())
                        location.href = '/api/linkedin/oauth?redirectTo=/application/company'
                    }}>
                    <LinkedInIcon/>{`
                `}<span class='icon__text'> Import from LinkedIn</span>
                </button>
            )
        }

        return (null)
    }
}

ImportFromLinkedInButton.propTypes = {
    dispatch : PropTypes.func,
    isCompleted : PropTypes.bool,
    isImporter : PropTypes.bool
}
ImportFromLinkedInButton.defaultProps = {
    isImporter : false
}

export default ImportFromLinkedInButton
