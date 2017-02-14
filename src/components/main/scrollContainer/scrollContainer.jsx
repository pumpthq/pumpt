import React, { Component, PropTypes } from 'react'


class ScrollContainer extends Component {
    render() {
        const { children } = this.props
        
        return (
            <div class='scroll-container scroll-container_content_all'>
                <div class='scroll-container__inner' ref='scroll' style={{'overflowY': 'scroll'}}>
                    {children}
                </div>
            </div>
        )
    }
}

ScrollContainer.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element
    ])
}
ScrollContainer.defaultProps = {
    children : ''
}

export default ScrollContainer
