import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'

@connect(
    function mapStateToProps(state, ownProps) {
        const location = state.applicationCandidate.location || {}
        const { canRelocate } = location
        const place = location.city && location.state ?
            `${location.city}, ${location.state}` : location.place

        return {
            place,
            canRelocate
        }
    }
)
class AddLocationFilled extends Component {

    render() {
        const {
            place,
            canRelocate
        } = this.props
        
        return (
            <DescriptionListItem>
                <h3 class="heading heading_type_two">{place}</h3>
                <div class="list__item-general">
                    <ul class="list list_type_inline">
                        <li class="list__item">
                            {canRelocate ? 'Can relocate' : null}
                        </li>
                    </ul>
                </div>
            </DescriptionListItem>
        )
    }

}

AddLocationFilled.propTypes = {
    place : PropTypes.string,
    canRelocate : PropTypes.bool
}

export default AddLocationFilled
