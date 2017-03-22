import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { OnboardingInput } from './../../onboarding'
import { startUploading } from './../../../actions/applicationPhotoUploading'
import { saveInterestsPhoto } from './../../../actions/applicationCandidate'
import { getPhoto } from './../../../reducers/applicationPhotoUploading'
import LogoIcon from './../../../components/icons/logo'
import uuid from 'uuid'

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
class AddPhotoArea extends Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    handleSubmit(file) {
        const { dispatch, mediaId } = this.props

        dispatch(startUploading({
            id : mediaId,
            async : true,
            file,
            controller : 'Interests',
            onDone : ({}) => {
                return saveInterestsPhoto({
                    mediaId
                })
            }
        }))
    }

    handleImageChange(event) {
        event.preventDefault()
        const file = event.target.files[0]

        if (!file) return
        this.handleSubmit(file)
    }

    componentWillMount() {
        this.id = uuid.v4()
    }

    render() {
        const {
            state,
            mediaId,
            onChange,
            value
        } = this.props
        const image = getPhoto(state, {
            id : mediaId
        })

        if (!image) {
            return (
                <div class='button button_type_file'>
                    <div class="button__inner">
                        <input
                            class="button__inputfile"
                            type="file"
                            name="file"
                            id={this.id}
                            onChange={this.handleImageChange}
                        />
                        <label
                            class="button__inputfile-label"
                            htmlFor={this.id}
                        >Add Photo</label>
                    </div>
                </div>
            )
        }

        const isUploading = image.isUploading

        return (
            <div class={`button button_type_file button_state_${isUploading ? 'uploading' : 'filled'}`}>
                <div class="button__inner">
                    {isUploading ?
                        <span class="button__inputfile-label">
                            <span class="logo logo_spinner logo_size_s">
                                <LogoIcon/>
                            </span>
                            <span class="text text_color_l-grey">Uploading</span>
                        </span> :
                        <span class="button__inputfile-label">
                            <img src={image.url} alt="interest1" class="image image_width_full"/>
                        </span>
                    }
                </div>
                <OnboardingInput
                    onChange={onChange}
                    value={value}
                    label='Add Description'
                    textFieldSize={false}
                />
            </div>
        )
    }
}

AddPhotoArea.propTypes = {
    state : PropTypes.object,
    dispatch : PropTypes.func,
    onChange : PropTypes.func,
    value : PropTypes.string,
    mediaId : PropTypes.string
}
AddPhotoArea.defaultProps = {}

export default AddPhotoArea
