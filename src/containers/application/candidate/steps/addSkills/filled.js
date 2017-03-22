import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'

@connect(
    function mapStateToProps(state, ownProps){
        const { skills } = state.applicationCandidate

        return {
            items : skills
        }
    }
)
class AddSkillsFilled extends Component {
    render() {
        const { items } = this.props

        return (
            <DescriptionListItem>
                <div class="list__item-general row">
                    <div class="col-lg-6">
                        {items.map((item) => {
                            if (item.value && !item.alternative && !item.items) {
                                return (
                                    <p key={uuid.v4()} class="text text_size_xs">{item.title}</p>
                                )
                            }

                            return (null)
                        })}
                    </div>
                    <div class="col-lg-6">
                        {items.map((item) => {
                            if (item.value && item.alternative) {
                                const inItems = item.items ? item.items.filter((inItem) => (inItem.value)) : false

                                return (
                                    <p key={uuid.v4()} class="text text_size_xs">
                                        {`${item.title} ${inItems && inItems.length ?
                                            `(${inItems.map((inItem) => (inItem.value)).join(', ')})` :
                                            ''
                                        }`}
                                    </p>
                                )
                            }

                            return (null)
                        })}
                    </div>
                </div>
            </DescriptionListItem>
        )
    }
}

AddSkillsFilled.propTypes = {
    items : PropTypes.arrayOf(PropTypes.shape({
        title : PropTypes.string.isRequired,
        placeholder : PropTypes.string,
        value : PropTypes.bool,
        alternative : PropTypes.bool,
        items : PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.arrayOf(PropTypes.shape({
                title : PropTypes.string,
                value : PropTypes.string
            }))
        ])
    }))
}

export default AddSkillsFilled
