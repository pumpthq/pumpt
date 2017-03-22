import React, { Component, PropTypes } from 'react'

class ApplicationAccordionPrototype extends Component {
    isActiveOrFilled({ constant }) {
        const { filled, active } = this.props
        const isActive = active === constant
        const isFilled = !isActive && filled.indexOf(constant) > -1

        return isActive ? 'active' : isFilled ? 'filled' : false;
    }
}
ApplicationAccordionPrototype.propTypes = {
    filled : PropTypes.arrayOf(PropTypes.string),
    active : PropTypes.string
}

export default ApplicationAccordionPrototype
