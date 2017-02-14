import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ShortID from 'shortid'

import Form from './../../../../../components/main/form'
import LogoIcon from './../../../../../components/icons/logo'
import TrashIcon from './../../../../../components/icons/trash-fill'

import {
    API_URL,
    API_IMAGES
} from '../../../../../constants/api';
import {
    startUploading
} from '../../../../../actions/applicationPhotoUploading'
import {
    saveAddPhotoStep,
    removeCompanyPhoto
} from '../../../../../actions/applicationCompany'
import {
    getPhoto
} from '../../../../../reducers/applicationPhotoUploading'
import {
    isUploaded as isPhotoUploaded
} from '../../../../../reducers/applicationCompany';

@connect(
    function mapStateToProps(state) {
        const { photos } = state.applicationCompany
        const images = photos.slice()

        return {
            state,
            images,
            isInvalid : !!images
                .filter((item) => (item.isUploaded))
                .length
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class PhotosMobile extends Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.removeImage = this.removeImage.bind(this)
    }

    handleSubmit(file) {
        const {
            dispatch,
            mediaId,
            controller,
        } = this.props

        dispatch(startUploading({
            id : mediaId,
            async : true,
            file,
            controller,
            onDone : () => (saveAddPhotoStep({ mediaId }))
        }))
    }

    handleImageChange(event) {
        event.preventDefault()
        const file = event.target.files[0]

        if (file) {
            this.handleSubmit(file)
        }
    }

    removeImage(id){
        const { dispatch } = this.props

        dispatch(removeCompanyPhoto({ id }))
    }

    componentWillMount() {
        this.applyButtonId = ShortID.generate()
    }

    render() {
        const {
            state,
            images
        } = this.props

        return (
            <Form class="form__row invisible-desktop">
                <div class="swipe-container swipe-container_location_app">
                    <div class="swipe-container__inner">
                        {images.map((item) => {
                            const { mediaId } = item
                            const cachedImage = getPhoto(state, { id : mediaId })

                            if (!item.isUploaded && !cachedImage) {
                                return (
                                    <div key={mediaId} class='button button_type_file'>
                                        <div class="button__inner">
                                            <input
                                                class="button__inputfile"
                                                type="file"
                                                id={this.applyButtonId}
                                                onChange={this.handleImageChange}

                                            />
                                            <label
                                                class="button__inputfile-label"
                                                htmlFor={this.applyButtonId}
                                            >Upload company photos</label>
                                        </div>
                                    </div>
                                )
                            }

                            const isUploading = cachedImage ? cachedImage.isUploading : false

                            return (
                                <div key={mediaId} class={`button button_type_file button_state_${isUploading ? 'uploading' : 'filled'}`}>
                                    <div class="button__inner">
                                        {isUploading ?
                                            <span class="button__inputfile-label">
                                                <span class="logo logo_spinner logo_size_s">
                                                    <LogoIcon/>
                                                </span>
                                                <span class="text text_color_l-grey">Uploading</span>
                                            </span> :
                                            <div class="button__inner">
                                                <span class="button__inputfile-label">
                                                    <img
                                                        class="image image_width_full"
                                                        src={cachedImage ? cachedImage.url : `${API_URL}${API_IMAGES}/${mediaId}`}
                                                    />
                                                </span>
                                                <button
                                                    type="button"
                                                    class="button button_type_trash"
                                                    onClick={() => {
                                                        this.removeImage(mediaId)
                                                    }}>
                                                    <TrashIcon/>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/*<div class="form__actions invisible-desktop">
                    <button
                        class="mdl-button button button_type_colored"
                        disabled
                    >
                        Add
                    </button>
                    <a
                        class="link"
                        href=""
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        Cancel
                    </a>
                </div>*/}
            </Form>
        )
    }
}

PhotosMobile.propTypes = {
    dispatch : PropTypes.func,
    isInvalid : PropTypes.bool,
    images : PropTypes.arrayOf(PropTypes.shape({
        mediaId: PropTypes.string,
        isUploaded: PropTypes.bool
    })),
}

PhotosMobile.defaultProps = {
    controller: 'CompanyPhotos'
}

export default PhotosMobile
