import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import H3 from '../../../../../components/main/heading/h3'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            schoolName,
            fieldOfStudy,
            degree,
            fromDate,
            toDate
        } = state.applicationCandidate.education
        
        return {
            schoolName,
            fieldOfStudy,
            degree,
            fromDate,
            toDate
        }
    }
)
class AddEducationFilled extends Component {
    render() {
        
        const {
            schoolName,
            fieldOfStudy,
            degree,
            fromDate,
            toDate
        } = this.props

        const startDate = moment(fromDate, 'MM-DD-YYYY')
        const endDate = moment(toDate, 'MM-DD-YYYY')
        const startOfEducation = startDate.format('MMMM YYYY')
        const endOfEducation = endDate.format() !== 'Invalid date' ? endDate.format('MMMM YYYY') : 'Present time'

        return (
            <DescriptionListItem>
                <H3 typeTwo>
                    {schoolName}
                </H3>
                <div class="list__item-general">
                    <ul class="list list_type_inline">
                        <li class="list__item">
                            {`${degree} `}
                        </li>
                        <li class="list__item">
                            {fieldOfStudy}
                        </li>
                    </ul>
                    <ul class="list list_type_inline">
                        <li class="list__item">
                            {startOfEducation} – {endOfEducation}
                        </li>
                    </ul>
                </div>
            </DescriptionListItem>
        )
    }
}

AddEducationFilled.propTypes = {
    schoolName : PropTypes.string,
    fieldOfStudy : PropTypes.string,
    degree : PropTypes.string,
    fromDate : PropTypes.string,
    toDate : PropTypes.string
}

AddEducationFilled.defaultProps = {}

export default AddEducationFilled
