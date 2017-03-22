import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { startUploading, retryUploading, removeImage } from '../../../../../actions/applicationPhotoUploading'
import { saveAddPhotoStep, removeCompanyPhoto } from '../../../../../actions/applicationCompany'
import { getPhotosByController } from '../../../../../reducers/applicationPhotoUploading'
import LogoIcon from '../../../../../components/icons/logo'
import TrashIcon from '../../../../../components/icons/trash-fill'
import uuid from 'uuid'

@connect(
    function mapStateToProps(state, ownProps) {
        const { controller } = ownProps
        const images = getPhotosByController(state, {
            controller
        }).filter((item) => (item.url || item.isUploading || item.isUploadingFailed))

        return {
            images
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class PhotosDesktop extends Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.retryUploading = this.retryUploading.bind(this)
    }

    handleSubmit(files) {
        const { dispatch, controller } = this.props

        files.forEach((file) => {
            const mediaId = uuid.v4()
            const media = {
                id : mediaId,
                async : true,
                file,
                controller,
                onDone : ({}) => {
                    return saveAddPhotoStep({ mediaId })
                }
            }

            this.files.push(media)
            dispatch(startUploading(media))
        })
    }

    handleImageChange(event) {
        const { files } = event.target

        if (files.length) {
            this.handleSubmit([...files])
        }
    }

    retryUploading(imageId) {
        const { dispatch } = this.props
        const queuedMedia = this.files
            .filter((item) => (item.id === imageId))
            .pop()

        if (queuedMedia) dispatch(retryUploading(queuedMedia))
    }

    removeImage(id) {
        const { dispatch } = this.props

        this.files = this.files.filter((item) => (item.id !== id))
        dispatch(removeCompanyPhoto({ id }))
        dispatch(removeImage({ id }))
    }

    componentWillMount() {
        this.componentKey = uuid.v4()
        this.files = []
    }

    getAddPhotoForm() {
        const { images } = this.props
        const newMediaKey = uuid.v4()
        if(images.length < 3) {
            return(
                <div key={newMediaKey} class='button button_type_file'>
                    <div class="button__inner">
                        <input
                            class="button__inputfile"
                            type="file" multiple
                            id={newMediaKey}
                            onChange={this.handleImageChange}
                        />
                        <label
                            class="button__inputfile-label text-center"
                            htmlFor={newMediaKey}
                        >Upload <br/> company photos</label>
                    </div>
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }

    }

    render() {
        const { images } = this.props
        const { componentKey } = this
        const newMediaKey = uuid.v4()

        if (!images.length) {
            return (
                <fieldset class="form__row form__row_nowrap invisible-tablet">
                    <div class="button button_type_file button_type_group-upload">
                        <div class="button__inner">
                            <input
                                type="file" multiple
                                id={componentKey}
                                class="button__inputfile"
                                onChange={this.handleImageChange}
                            />
                            <label
                                class="button__inputfile-label text-center"
                                htmlFor={componentKey}
                            >{'Upload '}<br/>company photos</label>
                        </div>
                    </div>
                </fieldset>
            )
        }

        return (
            <div class="form__row">
                {/*TODO invisible-tablet*/}
                <div class="swipe-container swipe-container_location_app invisible-tablet">
                    <div class="swipe-container__inner">
                        {images.map((image) => {
                            const imageId = image.id

                            if (image.isUploadingFailed) {
                                return (
                                    <div key={imageId} class="button button_type_file button_state_error">
                                        <div class="button__inner">
                                            <span class="button__inputfile-label text-center">
                                            <span class="text text_color_l-grey">Something went wrong</span>
                                            <span class="button__error-links">
                                                <a href="" class="link" onClick={(event) => {
                                                    event.preventDefault()

                                                    this.retryUploading(imageId)
                                                }}>Retry</a>
                                                <a href="" class="link" onClick={(event) => {
                                                    event.preventDefault()

                                                    this.removeImage(imageId)
                                                }}>Cancel</a>
                                            </span>
                                            </span>
                                        </div>
                                    </div>
                                )
                            }

                            const isUploading = image.isUploading

                            if (isUploading || (!isUploading && image.url)) {
                                return (
                                    <div key={imageId} class={`button button_type_file button_state_${isUploading ? 'uploading' : 'filled'}`}>
                                        {isUploading ?
                                            <div class="button__inner">
                                                <span class="button__inputfile-label">
                                                    <span class="logo logo_spinner logo_size_s">
                                                        <LogoIcon/>
                                                    </span>
                                                    <span class="text text_color_l-grey">Uploading</span>
                                                </span>
                                            </div> :
                                            <div class="button__inner">
                                                <span class="button__inputfile-label">
                                                    <img src={image.url} alt="interest1" class="image image_width_full"/>
                                                </span>
                                                <button
                                                    type="button"
                                                    class="button button_type_trash"
                                                    onClick={(event) => {
                                                        event.preventDefault()

                                                        this.removeImage(imageId)
                                                    }}>
                                                    <TrashIcon/>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        })}

                        { this.getAddPhotoForm()
                            /* if(images.length < 3) {
                            <div key={newMediaKey} class='button button_type_file'>
                                <div class="button__inner">
                                    <input
                                        class="button__inputfile"
                                        type="file" multiple
                                        id={newMediaKey}
                                        onChange={this.handleImageChange}
                                    />
                                    <label
                                        class="button__inputfile-label text-center"
                                        htmlFor={newMediaKey}
                                    >Upload <br/> company photos</label>
                                </div>
                            </div>
                        } */ }
                    </div>
                </div>
            </div>
        )
    }
}

PhotosDesktop.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object),
    state : PropTypes.object,
    mediaId : PropTypes.string,
    dispatch : PropTypes.func,
    controller : PropTypes.string
}

PhotosDesktop.defaultProps = {
    controller: 'CompanyPhotos'
}

export default PhotosDesktop
