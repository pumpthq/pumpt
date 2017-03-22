import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import deepCopy from 'deep-copy'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            location
        } = state.applicationCompany

        return {
            offices : deepCopy(location)
        }
    }
)
class AddLocationsFilled extends Component {

    render() {
        const {
            offices
        } = this.props

        return (
            <DescriptionListItem>
                {offices.map((office) => {
                    const { title, city, state } = office
                    const isExistOffice = city && state

                    if (!isExistOffice) return (null)

                    return [
                        <h3 class="text text_size_s">
                            {`${city}, ${state}`}
                        </h3>,
                        <div class="list__item-general">
                            <span class="text text_color_l-grey">{title}</span>
                        </div>
                    ]
                })}
            </DescriptionListItem>
        )
    }
}

AddLocationsFilled.propTypes = {
    offices : PropTypes.arrayOf(PropTypes.object)
}

AddLocationsFilled.defaultProps = {}

export default AddLocationsFilled
