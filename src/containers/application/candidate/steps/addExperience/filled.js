import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import H3 from '../../../../../components/main/heading/h3'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            companyName,
            title,
            location,
            fromDate,
            toDate,
            workHere,
            description
        } = state.applicationCandidate.experience

        return {
            companyName,
            title,
            location : Object.assign({}, location),
            fromDate,
            toDate,
            workHere,
            description
        }
    }
)
class AddExperienceFilled extends Component {

    render() {
        const {
            companyName,
            title,
            location,
            fromDate,
            toDate,
            workHere,
            description
        } = this.props
        const startDate = moment(fromDate, 'MM-DD-YYYY')
        const endDate = workHere ? 'Present' : moment(toDate, 'MM-DD-YYYY')
        const workExperience = workHere ? startDate.toNow(true) : startDate.to(endDate, true)

        const startOfWork = startDate.format('MMMM YYYY')
        const endOfWork = workHere ? 'Present' : endDate.format('MMMM YYYY')

        const place = location.city && location.state ? `${location.city}, ${location.state}` : location.place

        return (
            <DescriptionListItem>
                <H3 typeTwo>
                    {companyName}
                </H3>
                <div class="list__item-general">
                    <ul class="list list_type_inline">
                        <li class="list__item">
                            {`${title} `}
                        </li>
                        <li class="list__item">
                            {place}
                        </li>
                    </ul>
                    <ul class="list list_type_inline">
                        <li class="list__item">
                            {`${workExperience} `}
                        </li>
                        <li class="list__item">
                            {startOfWork} – {endOfWork}
                        </li>
                    </ul>
                </div>

                <div class="list__item-summary">
                    <p class="text text_size_xs">{description}</p>
                </div>
            </DescriptionListItem>
        )
    }

}

AddExperienceFilled.propTypes = {
    companyName : PropTypes.string,
    title : PropTypes.string,
    location : PropTypes.shape({
        city : PropTypes.string,
        state : PropTypes.string
    }),
    fromDate : PropTypes.string,
    toDate : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    workHere : PropTypes.bool,
    description : PropTypes.string
}

AddExperienceFilled.defaultProps = {}
        
export default AddExperienceFilled
