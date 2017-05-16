import React, {Component, PropTypes} from 'react';
import GlassDoorImage from 'img/glassdoor.jpg'

import { tintedBackground } from 'components/helpers'
import { browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {};


export default class MatchesList extends Component {

    render() {
        const { matches, job } = this.props
        return (

            <div className="mdl-card card card_type_mini card_state_open">
                { JSON.stringify(job) }
                <CardDivider />

                { matches && matches.map( match =>
                    { match._candidate }
                    <CardDivider />
                )}
            </div>
        )
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

MatchesList.propTypes = propTypes;
MatchesList.defaultProps = defaultProps;
