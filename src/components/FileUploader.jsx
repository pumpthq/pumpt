import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import PencilIcon from 'components/icons/pencil';
import {uploadFile} from 'actions/upload'
import {apiFile} from 'components/helpers'
import './fileuploader.less'

@connect(state => ({
  fileId: state.candidateMatches.candidate.resumeId,
  fileName: state.candidateMatches.candidate.resumeName
}))
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

  handleKeyPress = (e) => {
    e.preventDefault()
    let code = e.charCode || e.keyCode
    if(code == 13 || code == 32){
      this.input.click();
    }
  }

    render() {
        const {
            fileId,
            additionalClass,
            iconPhoto,
          label,
          fileName,
        } = this.props

        const inputId = uuid.v4()

        if (fileId) {
            const fileUrl = apiFile(fileId)

          return (
            <span class={`upload-file-component used ${additionalClass}`}>
              Click Edit to remove your resume and upload a new version
              <input className="hide" ref={input => this.input = input} id={inputId} type="file" onChange={this.handleFileChange}/>
              <label htmlFor={inputId}>
                  <label for="filename" className="hide">uploaded file</label>
                  <input type="text" id="filename" autoComplete="off"
                    readOnly value={fileName} />
                <span
                  className="edit"
                  role="button" aria-controls={inputId} tabIndex="0"
                  onKeyPress={this.handleKeyPress}
                >
                <PencilIcon />
                &nbsp;Edit
                </span>
              </label>
              <span className="view">
                <a href={fileUrl}>View {label}</a>
              </span>
            </span>
          )
        }

      return (
        <span class={`upload-file-component fresh ${additionalClass}`}>
          Please upload your resume
          <input className="hide" ref={input => this.input = input} id={inputId} type="file" onChange={this.handleFileChange}/>
          <label htmlFor={inputId}>
            <span
              className="mdl-button button button_type_colored button_size_l"
              role="button" aria-controls={inputId} tabIndex="0"
              onKeyPress={this.handleKeyPress}
            >
              Add {label}
            </span>
          </label>
        </span>
      )
    }
}
