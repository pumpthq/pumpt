import React, { Component, PropTypes } from 'react'
import UploadApplicationImage from './../../../../components/application/uploadImage'
import { connect } from 'react-redux'
import { startUploading } from './../../../../actions/applicationPhotoUploading'
import { saveProfilePhotoData } from './../../../../actions/applicationCandidate'

@connect(
    function mapStateToProps(state) {
        const { profilePhoto } = state.applicationCandidate

        return {
            profilePhoto
        }
    }
)
class UploadCandidateApplicationImage extends Component {

    render() {
        const { profilePhoto } = this.props

        return (
            <UploadApplicationImage
                {...this.props}
                imageId={profilePhoto}
                onSubmit={({ dispatch, id, file, controllerId }) => {
                    dispatch(startUploading({
                        id,
                        async : true,
                        file : file,
                        controller : controllerId,
                        onDone : ({ id }) => {
                            return saveProfilePhotoData({
                                profilePhoto : id
                            })
                        }

                    }))
                }}/>
        )
    }
}

UploadCandidateApplicationImage.propTypes = {
    profilePhoto : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
}

export default UploadCandidateApplicationImage
