import React, { Component, PropTypes } from 'react'
import PhotosDesktop from './PhotosDesktop'
import PhotosMobile from './PhotosMobile'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'

class AddPhotosForm extends Component {

    render() {
        return (
            <DescriptionListItem>
                <PhotosMobile/>
                <PhotosDesktop/>
            </DescriptionListItem>
        )
    }

}

export default AddPhotosForm
