import React, {Component, PropTypes} from 'react'

class IconPrototype extends Component {

    makeClasses(init, additional) {
        const { className } = this.props
        const classes = [ init, className ]

        if (additional) classes.push(...additional)

        return classes.join(' ')
    }

}

IconPrototype.propTypes = {
    className : PropTypes.string
}
IconPrototype.defaultProps = {
    className : ''
}

export default IconPrototype
