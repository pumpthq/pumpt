import React, {PropTypes} from 'react'

const Layout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

Layout.propTypes = {
    children : PropTypes.node.isRequired
}

export default Layout

