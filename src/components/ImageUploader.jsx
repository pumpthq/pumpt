import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import '../styles/ImageUploader.less'
import uuid from 'uuid'

import {API_URL,API_IMAGES} from 'constants/api'
import {uploadImage} from 'actions/upload'

@connect()
export default class ImageUploader extends Component {

    // constructor(props) {
    //     super(props)
    // }

    handleSubmit = (file) => {
        let {label, dispatch, onSuccessAction} = this.props

        dispatch(uploadImage(file,onSuccessAction))
    }

    handleImageChange = (event) => {
        event.preventDefault()
        const file = event.target.files[0]

        // console.log('auto submitting file:',file)

        if (!file) return
        this.handleSubmit(file)
    }

    render() {
        const {
            imageId,
            additionalClass,
            iconPhoto,
            label,
        } = this.props

        const inputId = uuid.v4()

        if (imageId) {
            const imageUrl = `${API_URL}${API_IMAGES}/${imageId}`
            const imageStyle = {
                backgroundImage : `url(${imageUrl})`,
                backgroundSize : 'cover',
                backgroundPosition : 'center'
            }


            return (
                <span class={`upload-image-component image image_round image_size_xxl image_photo ${additionalClass}`}>
                    <img class="image image_round image_width_full" style={imageStyle}/>
                    <input id={inputId} type="file" onChange={this.handleImageChange}/>
                    <label htmlFor={inputId} class="link" href="">Change {label}</label>
                </span>
            )
        }

        return (
            <span class={`upload-image-component image image_round image_size_xxl image_empty image_photo ${additionalClass}`}>
                {iconPhoto}
                <input id={inputId} type="file" onChange={this.handleImageChange}/>
                <label htmlFor={inputId} class="link">Add {label}</label>
            </span>
        )
    }
}
