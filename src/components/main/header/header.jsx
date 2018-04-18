import React, {Component} from 'react'

const propTypes = {}
const defaultProps = {}

export default class Header extends Component {
    render() {
        return (
            <header class='header'>
                <div class='header__item'>
                    <a href="http://pumpthq.com/" class="logo">
                        <svg class='icon icon-logo'>
                        </svg>
                    </a>
                    <nav class='navigation navigation_color_invert navigation_inline'>
                        <a href='#' class='navigation__link navigation__link_active'>Matches</a>
                        <span class='navigation__link popup__relate'>
                        <a href=''>Messages</a>

                        <span class='popup popup_type_relate'>
                            <span class='popup__inner notification notification_type_success notification_type_bubble'>
                                <span class='heading heading_type_three notification__heading'>
                                    <span>Application sent</span>
                                    <svg class='icon icon-ok icon-ok_size_big icon_inline'>
                                    </svg>
                                </span>
                            <span class='text notification__text'>Thank you for your application. When employer replies, you will see a
                              new message. All your conversations are stored in Messages section.
                            </span>
                            <a href='' class='link'>Got it</a>
                            </span>
                        </span>
                      </span>
                        <div class='popup__overlay'></div>
                    </nav>
                </div>
            </header>
        )
    }
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps
