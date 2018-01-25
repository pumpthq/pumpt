import React, {Component} from 'react';
import HeaderFull from './../../../../components/main/header/headerFull';
import ScrollContainer from './../../../../components/main/scrollContainer';
import Panel from './../../../../components/main/panel';
import {H1, H2} from './../../../../components/main/heading';
import Footer from './../../../../components/main/footer/footer';

class EmptyMatches extends Component {
    render() {
        return (
            <div className="page wall wall_type_revert wall_image_first">
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-lg-12">
                            <HeaderFull
                                menu={<a href="">Messages</a>}
                            />
                        </div>
                    </div>
                </div>
                <ScrollContainer>
                    <div className="content__wrapper">
                        <div className="content">
                            <div className="container">
                                <div className="row row-padding-bigger">
                                    <div className="col-lg-12">
                                        <Panel className="panel_padding_big panel_size_fixed panel_pos_center panel_type_content">
                                            <H1 typeFour>Welcome to matches!</H1>
                                            <p className="text text_size_xs text_type_content">
																						You’ll be notified via email as soon as you’ve been matched to jobs.
                                            </p>
                                            <H2 typeTwo>Blacklist</H2>
                                            <p className="text text_size_xs text_type_content">
                                                You will not be matched to any jobs posted by your current employer.
                                                And if there are other companies you wish not to be matched with,
                                                our 'Blacklist’ feature will prevent you from being matched with
                                                these companies as well.
                                            </p>
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </ScrollContainer>
            </div>
        );
    }
}

export default EmptyMatches;
