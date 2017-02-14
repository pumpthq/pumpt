import React, { Component, PropTypes } from 'react'
import OkIcon from './../../components/icons/ok'

class ProgressChartSidebarPrototype extends Component {
    constructor(props) {
        super(props)

        this.setLevel = this.setLevel.bind(this)
        this.evaluateStates = this.evaluateStates.bind(this)
        this.makeClasses = this.makeClasses.bind(this)
        this.renderOkIcon = this.renderOkIcon.bind(this)
    }
    
    setLevel(completed) {
        const { filled } = this.props
        const progress = completed + filled.length
        const percent = Math.ceil(100 / 12 * progress)

        return {
            percent,
            progress
        }
    }
    
    evaluateStates({ constant }) {
        const { active, filled } = this.props

        const isActive = active.indexOf(constant) > -1
        const isFilled = filled.indexOf(constant) > -1

        return {
            isActive : isActive && !isFilled,
            isFilled : !isActive && isFilled,
            isActiveAndFilled : isActive && isFilled
        }
    }

    makeClasses({ constant }) {
        const classes = ['navigation__link']
        const {
            isActive,
            isFilled,
            isActiveAndFilled
        } = this.evaluateStates({ constant })

        if (isActiveAndFilled) {
            classes.push('navigation__link_active')
        } else {
            isActive ? classes.push('navigation__link_active') : null
            isFilled ? classes.push('navigation__link_filled') : null
        }

        return classes.join(' ')
    }
    
    renderOkIcon({ constant }) {
        const {
            isFilled
        } = this.evaluateStates({ constant })
        
        return isFilled ? <OkIcon/> : null
    }
}
ProgressChartSidebarPrototype.propTypes = {
    active : PropTypes.arrayOf(PropTypes.string),
    filled : PropTypes.arrayOf(PropTypes.string),
    isStarted : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    progress : PropTypes.number,
    percent : PropTypes.number,
    completed: PropTypes.number,
}
ProgressChartSidebarPrototype.defaultProps = {
    progress : 5,
    percent : 42,
    completed : 5,
}

export default ProgressChartSidebarPrototype
