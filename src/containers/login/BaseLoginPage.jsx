import React, { Component, PropTypes } from 'react'
import PopUpBig from './../../components/main/popup'

class BaseLoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { children } = this.props

        return (
            <PopUpBig heading='Log In' children={children}/>
        )
    }

}

BaseLoginPage.propTypes = {
    children : PropTypes.node
}
BaseLoginPage.defaultProps = {}

export default BaseLoginPage
