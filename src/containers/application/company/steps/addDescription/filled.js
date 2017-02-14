import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'


@connect(
    function mapStateToProps(state, ownProps) {

        const { description } = state.applicationCompany

        return {
            description
        }
    }
)
class AddDescriptionFilled extends Component {
    render() {
        
        const { description } = this.props

        return (
            <DescriptionListItem>
                <div class="list__item-general" style={{
                    whiteSpace : 'pre'
                }}>
                    { description }
                </div>
            </DescriptionListItem>
        )
    }
}

AddDescriptionFilled.propTypes = {
    description : PropTypes.string
}

AddDescriptionFilled.defaultProps = {}

export default AddDescriptionFilled
