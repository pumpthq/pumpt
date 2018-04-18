import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import PencilIcon from 'components/icons/pencil';
import LoadingIcon from 'components/icons/loading.jsx';
import {uploadFile} from 'actions/upload'
import {apiFile} from 'components/helpers'
import './fileuploader.less'

@connect(state => ({
  fileId: state.candidateMatches.candidate.resumeId,
  fileName: state.candidateMatches.candidate.resumeName
}))
export default class FileUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      recentUploadFailure: false,
      recentUploadSuccess: false,
    };
  }

  handleSuccess = () => {
    this.setState({
      uploading: false,
      recentUploadSuccess: true,
    });

    setTimeout(() => {
      this.setState({
        recentUploadSuccess: false,
      })
    }, 5000);
  }

  handleFailure = (err) => {
    this.setState({
      uploading: false,
      recentUploadFailure: true,
    });
  }

  handleSubmit = (file) => {
    let {dispatch, onSuccessAction} = this.props;
    dispatch(uploadFile(file,onSuccessAction))
      .then(this.handleSuccess)
      .catch(this.handleFailure);

    this.setState({
      recentUploadFailure: false,
      recentUploadSuccess: false,
      uploading: true,
    })
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
              <div className="row">
                <div className="col-12 col-md-6">
                  <span className={`upload-file-component used ${additionalClass}`}>
                    Click Edit to remove your resume and upload a new version (PDF)

                    {/* hide the ugly file-upload element and style the label instead */}
                    <input
                      className="hide"
                      ref={input => this.input = input} id={inputId}
                      type="file" onChange={this.handleFileChange}
                      accept=".pdf, application/pdf"
                    />
                    <label htmlFor={inputId}>
                      <label for="filename" className="hide">uploaded file</label>
                      <span className={`filename-box`} id="filename" title={fileName}>
                        {
                          this.state.recentUploadSuccess && <span className="success">&#10004;</span>
                        }
                        {
                          this.state.recentUploadFailure && <span className="failure">&times;</span>
                        }
                        { this.state.uploading ? <span><LoadingIcon /> uploading...</span> : fileName}
                      </span>
                      <span
                        className="edit"
                        role="button" aria-controls={inputId} tabIndex="0"
                        onKeyPress={this.handleKeyPress}
                      >
                        <PencilIcon />
                        &nbsp;Edit
                      </span>
                    </label>
                    { this.state.recentUploadFailure && <span className="failure">Failed to update resume: we only accept PDFs under 4MB</span>}
                    <span className="view">
                      <a href={fileUrl}>View {label}</a>
                    </span>
                  </span>
                </div>
              </div>
          )
        }

      return (
          <div className="row">
            <div className="col-12 col-md-6">
              <span class={`upload-file-component fresh ${additionalClass}`}>
                Please upload your resume (PDF)
                <input className="hide"
                  ref={input => this.input = input} id={inputId}
                  type="file" onChange={this.handleFileChange}
                  accept=".pdf, application/pdf"
                />
                <label htmlFor={inputId}>
                  <span
                    className="mdl-button button button_type_colored button_size_l"
                    role="button" aria-controls={inputId} tabIndex="0"
                    onKeyPress={this.handleKeyPress}
                  >
                    { this.state.uploading ? <span>uploading...<LoadingIcon /></span> : `Add ${label}`}
                  </span>
                </label>
                { this.state.recentUploadFailure && <span className="failure">Failed to update resume: we only accept PDFs under 4MB</span>}
              </span>
            </div>
          </div>
      )
    }
}
