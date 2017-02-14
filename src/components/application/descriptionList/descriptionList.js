import React, { Component, PropTypes } from 'react'

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ])
}

const defaultProps = {
    children : ''
}

export default class DescriptionList extends Component {
    render() {
        return (
        <div class="container-fluid">
            <div class="row row-padding-bigger">
                <div class="col-lg-12">
                    <dl className='list list_accordion list_type_app'>
                        {this.props.children}
                    </dl>
                </div>
            </div>
        </div>
        )
    }
}

DescriptionList.propTypes = propTypes
DescriptionList.defaultProps = defaultProps
