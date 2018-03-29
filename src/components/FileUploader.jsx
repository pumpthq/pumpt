import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import {uploadFile} from 'actions/upload'
import {apiFile} from 'components/helpers'

@connect()
export default class FileUploader extends Component {

    handleSubmit = (file) => {
        let {dispatch, onSuccessAction} = this.props;
        dispatch(uploadFile(file,onSuccessAction));
    }

    handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (!file) return;
        this.handleSubmit(file);
    }

    render() {
        const {
            fileId,
            additionalClass,
            iconPhoto,
            label,
        } = this.props

        const inputId = uuid.v4()

        if (fileId) {
            const fileUrl = apiFile(fileId)

            return (
                <span class={`upload-image-component image image_round image_size_xxl image_photo ${additionalClass}`}>
                  {iconPhoto}
                  <input id={inputId} type="file" onChange={this.handleFileChange}/>
                  <label htmlFor={inputId} class="link" href="">Change {label}</label>
                </span>
            )
        }

        return (
            <span class={`upload-image-component image image_round image_size_xxl image_empty image_photo ${additionalClass}`}>
                {iconPhoto}
                <input id={inputId} type="file" onChange={this.handleFileChange}/>
                <label htmlFor={inputId} class="link">Add {label}</label>
            </span>
        )
    }
}
