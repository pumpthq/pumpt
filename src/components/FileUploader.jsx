import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import LoadingIcon from 'components/icons/loading';
import { uploadFile } from 'actions/upload';
import { apiFile } from 'components/helpers';
import './FileUploader.less';

@connect(state => ({
  fileId: state.candidateMatches.candidate.resumeId,
  fileName: state.candidateMatches.candidate.resumeName,
}))
class FileUploader extends Component {
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
      });
    }, 5000);
  };

  handleFailure = err => {
    console.log(err);
    this.setState({
      uploading: false,
      recentUploadFailure: err,
    });
  };

  handleSubmit = file => {
    const { dispatch, onSuccessAction } = this.props;
    dispatch(uploadFile(file, onSuccessAction))
      .then(this.handleSuccess)
      .catch(this.handleFailure);

    this.setState({
      recentUploadFailure: false,
      recentUploadSuccess: false,
      uploading: true,
    });
  };

  handleFileChange = event => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) return;
    this.handleSubmit(file);
  };

  handleKeyPress = e => {
    e.preventDefault();
    const code = e.charCode || e.keyCode;
    if (code === 13 || code === 32) {
      this.input.click();
    }
  };

  render() {
    const { fileId, additionalClass, iconPhoto, label, fileName } = this.props;

    const { recentUploadFailure, recentUploadSuccess, uploading } = this.state;

    const inputId = uuid.v4();

    if (fileId) {
      const fileUrl = apiFile(fileId);

      return (
        <div className="row">
          <div className="col-12">
            <span className={`upload-file-component used ${additionalClass}`}>
              {/* hide the ugly file-upload element and style the label instead */}
              <input
                className="d-none"
                ref={input => (this.input = input)}
                id={inputId}
                type="file"
                onChange={this.handleFileChange}
                accept=".pdf, application/pdf"
              />
              <label id={`${inputId}__label`} htmlFor={inputId}>
                <div className="row py-3 align-items-center">
                  <div className="col-auto">
                    <span className="hide neutral">Uploaded file:</span>
                  </div>
                  <div className="col-auto">
                    <span
                      className="filename-box border rounded text-nowrap p-2 my-2 d-inline-block"
                      id="filename"
                      title={fileName}
                    >
                      {recentUploadSuccess && (
                        <span className="success">&#10004;</span>
                      )}
                      {recentUploadFailure && (
                        <span className="failure">&times;</span>
                      )}
                      {uploading ? (
                        <span>
                          <LoadingIcon />
                          uploading...
                        </span>
                      ) : (
                        fileName
                      )}
                    </span>
                  </div>
                  <div className="col-auto">
                    <span
                      className="edit button_type_text button_size_s"
                      role="button"
                      aria-controls={inputId}
                      tabIndex="0"
                      onKeyPress={this.handleKeyPress}
                    >
                      Edit
                    </span>
                  </div>
                  {recentUploadFailure &&
                    (recentUploadFailure.status === 413 ? (
                      <div className="col-12">
                        <span className="failure">
                          Failed to update resume: we only accept PDFs under 4MB
                        </span>
                      </div>
                    ) : (
                      <div className="col-12">
                        <span className="failure">
                          {recentUploadFailure.data.message ||
                            recentUploadFailure.statusText}
                        </span>
                      </div>
                    ))}
                </div>
              </label>
              <span className="view row">
                <div className="col-12">
                  <a href={fileUrl} rel="noreferrer noopener" target="_blank">
                    <button type="button" className="button_type_colored">
                      {`View ${label}`}
                    </button>
                  </a>
                </div>
              </span>
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="row py-3 align-items-center">
        <div className="col-12">
          <span className={`upload-file-component fresh ${additionalClass}`}>
            <input
              className="d-none"
              ref={input => (this.input = input)}
              id={inputId}
              type="file"
              onChange={this.handleFileChange}
              accept=".pdf, application/pdf"
            />
            <label id={`${inputId}__label`} htmlFor={inputId}>
              <span
                className="mdl-button button button_type_colored button_size_l"
                role="button"
                aria-controls={inputId}
                tabIndex="0"
                onKeyPress={this.handleKeyPress}
              >
                {uploading ? (
                  <span>
                    Uploading...
                    <LoadingIcon />
                  </span>
                ) : (
                  `Add ${label}`
                )}
              </span>
            </label>
            {recentUploadFailure &&
              (recentUploadFailure.status === 413 ? (
                <div className="col-12">
                  <span className="failure">
                    Failed to update resume: we only accept PDFs under 4MB
                  </span>
                </div>
              ) : (
                <div className="col-12">
                  <span className="failure">
                    {recentUploadFailure.data.message ||
                      recentUploadFailure.statusText}
                  </span>
                </div>
              ))}
          </span>
        </div>
      </div>
    );
  }
}

export default FileUploader;
