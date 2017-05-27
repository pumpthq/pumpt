import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
                <footer class="container footer">
                    <div class="row row-padding-bigger no-gutter">
                        <div class="col-lg-8 col-sm-8 col-md-8 col-xs-12 footer__item">
                            <nav class="navigation navigation_type_footer">
                                <a
                                    href="mailto:info@pumpthq.com"
                                    class="navigation__link text text_color_invert text_opacity_half"
                                >
                                    Contact
                                </a>{' '}
                                <a
                                    href="http://pumpthq.com/privacy-policy.html"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    class="navigation__link text text_color_invert text_opacity_half"
                                >
                                    Privacy Policy
                                </a>{' '}
                                <a
                                    href="http://pumpthq.com/terms-of-use.html"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    class="navigation__link text text_color_invert text_opacity_half"
                                >
                                    Terms & Conditions
                                </a>{' '}
                            </nav>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-md-4 col-xs-12 text-right footer__item">
                            <address class="text text_color_invert text_opacity_half">
                                &copy; 2017 Pumpt Platform, LLC.
                            </address>
                        </div>
                    </div>
                </footer>
        )
    }
}

export default Footer
