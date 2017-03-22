import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './styles/uploadImage.less'
import uuid from 'uuid'
import { getPhotoByController } from './../../reducers/applicationPhotoUploading'
import {
    API_URL,
    API_IMAGES
} from './../../constants/api'

@connect(
    function mapStateToProps(state, ownProps) {
        return {
            state
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class UploadImage extends Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    handleSubmit(file) {
        const { onSubmit, dispatch, controllerId } = this.props
        const imageId = uuid.v4()

        this.setState({
            imageId
        })
        onSubmit({
            dispatch,
            id : imageId,
            file,
            controllerId
        })
    }

    handleImageChange(event) {
        event.preventDefault()
        const file = event.target.files[0]

        if (!file) return
        this.handleSubmit(file)
    }

    render() {
        const {
            state,
            imageId,
            controllerId,
            additionalClass,
            iconPhoto
        } = this.props
        const mediaUnit = getPhotoByController(state, {
            controller : controllerId
        })
        const isImagePersisted = imageId ? `${API_URL}${API_IMAGES}/${imageId}` : mediaUnit && mediaUnit.url ? mediaUnit.url : null

        if (isImagePersisted) {
            const style = {
                backgroundImage : `url(${isImagePersisted})`,
                backgroundSize : 'cover',
                backgroundPosition : 'center'
            }


            return (
                <span class={`upload-image-component image image_round image_size_xxl image_photo ${additionalClass}`}>
                    <img class="image image_round image_width_full" style={style}/>
                    <input id="uploadImage" type="file" onChange={this.handleImageChange}/>
                    <label htmlFor="uploadImage" class="link" href="">Change Photo</label>
                </span>
            )
        }

        return (
            <span class={`upload-image-component image image_round image_size_xxl image_empty image_photo ${additionalClass}`}>
                {iconPhoto}
                <input id="uploadImage" type="file" onChange={this.handleImageChange}/>
                <label htmlFor="uploadImage" class="link">Add Photo</label>
            </span>
        )
    }
}

UploadImage.propTypes = {
    onSubmit : PropTypes.func,
    dispatch : PropTypes.func,
    state : PropTypes.object,
    controllerId : PropTypes.string,
    additionalClass : PropTypes.string,
    iconPhoto : PropTypes.node,
    imageId : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
}
UploadImage.defaultProps = {
    controllerId : 'SummaryHead',
    additionalClass : '',
    onSubmit : function({ dispatch, id, file, controllerId }) {}
}

export default UploadImage
