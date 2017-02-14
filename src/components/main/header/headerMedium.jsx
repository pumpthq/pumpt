import React, { Component, PropTypes } from 'react'

const propTypes = {}
const defaultProps = {}

export default class HeaderMedium extends Component {
    render() {
        return (
            <header class='header header_mini'>
                <div class='header__item'>
                    <a href='/' class='logo logo_full'>
                        <svg class='icon icon-logo'>
                        </svg>
                    </a>
                </div>

                <div class='header__item'>
                    <a href='' class='link profile-progress__wrapper'>
                        <span class='text text_color_invert'>Jane Sullivan</span>
                        <span class='profile-progress profile-progress_size_s'>
                            <span class='image image_round image_size_xxl image_empty image_photo'>
                                <svg class='icon icon-person'>
                                </svg>
                            </span>
                        </span>
                    </a>
                </div>
            </header>
        )
    }
}

HeaderMedium.propTypes = propTypes
HeaderMedium.defaultProps = defaultProps
