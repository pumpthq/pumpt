import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './matches.less';
import { CardCarousel } from './../../../components/matches';


const propTypes = {
    matches: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        logo: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        match: PropTypes.numberss,
        salary: PropTypes.string,
        experience: PropTypes.string,
        employment: PropTypes.string,
        text: PropTypes.string,
        background: PropTypes.string
    }))
};
const defaultProps = {};

@connect(
    function mapStateToProps(state) {
        return {
            state
        }
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch
        }
    }
)
export default class MatchesSliderPrototype extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <CardCarousel {...this.props} />
    }

}

MatchesSliderPrototype.propTypes = propTypes;
MatchesSliderPrototype.defaultProps = defaultProps;
