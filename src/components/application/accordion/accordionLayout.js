import React, { Component, PropTypes } from 'react'

class AccordionLayout extends Component {
    render() {
        const { children, importButton } = this.props

        return (
            <div className="container-fluid">
                <div className="row row-padding-bigger">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <dl className="list list_accordion list_type_app">
                            {children}
                        </dl>
                        <div class="button__wrapper invisible-desktop">
                            {importButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AccordionLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    importButton : PropTypes.node
}
AccordionLayout.defaultProps = {
    children : ''
}

export default AccordionLayout
