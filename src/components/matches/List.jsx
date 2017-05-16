import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {};


export default class MatchesList extends Component {

    render() {
        const { matches, job } = this.props
        return (

            <div className="mdl-card card card_type_mini card_state_open">
                <a class="button button_type_close" onClick={browserHistory.goBack}>×</a>

                { JSON.stringify(job) }
                <CardDivider />

                { matches && matches.map( match =>
                    <div>
                        { match._candidate }
                        <CardDivider />
                    </div>
                )}
            </div>
        )
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

MatchesList.propTypes = propTypes;
MatchesList.defaultProps = defaultProps;
