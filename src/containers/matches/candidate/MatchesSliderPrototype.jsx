import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './matches.less';

const propTypes = {
    matches: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        logo: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        match: PropTypes.string,
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

}

MatchesSliderPrototype.propTypes = propTypes;
MatchesSliderPrototype.defaultProps = defaultProps;
