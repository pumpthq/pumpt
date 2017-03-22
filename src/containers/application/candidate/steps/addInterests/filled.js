import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DescriptionListItem from './../../../../../components/application/descriptionList/descriptionListItem'
import { getPhoto } from './../../../../../reducers/applicationPhotoUploading'

@connect(
    function mapStateToProps(state, ownProps) {
        const { applicationCandidate } = state
        const interests = applicationCandidate.interests.map((element) => {
            const photo = getPhoto(state, { id : element.mediaId })

            if (photo) {
                return Object.assign({}, photo, element)
            }

            return Object.assign({}, element)
        })

        return {
            state,
            interests
        }
    },
)
class AddInterestsFilled extends Component {

    render() {
        const {
            interests
        } = this.props
        
        return (
            <DescriptionListItem>
                <ul class="list list_type_inline list_type_images">
                    {interests.map((element) => {
                        if (!element.url) return null

                        return (
                            <li class="list__item">
                                <figure class="figure">
                                    <img
                                        class="figure__image image image_width_full"
                                        alt={element.description}
                                        src={element.url}
                                    />
                                    <figcaption class="figure__caption text text_size_xs">{element.description}</figcaption>
                                </figure>
                            </li>
                        )
                    })}
                </ul>
            </DescriptionListItem>
        )
    }

}

AddInterestsFilled.propTypes = {
    state : PropTypes.object,
    interests : PropTypes.arrayOf(PropTypes.shape({
        url : PropTypes.string,
        description : PropTypes.string
    }))
}

export default AddInterestsFilled
