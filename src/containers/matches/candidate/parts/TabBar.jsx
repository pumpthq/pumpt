import React, { Component, PropTypes } from 'react'
import { TabBar as TabBarView } from '../../../../components/matches'
import MatchesIcon from '../../../../components/icons/Matches';
import BookmarkFill from '../../../../components/icons/BookmarkFill';
import DeclineIcon from '../../../../components/icons/Decline';

import {
    routeToAll,
    routeToBookmarked,
    routeToNotInterested
} from './../../../../actions/candidateMatches';
import {
    ROUTE_CANDIDATE_MATCHES_ALL,
    ROUTE_CANDIDATE_MATCHES_BOOKMARKED,
    ROUTE_CANDIDATE_MATCHES_NOT_INTERESTED
} from './../../../../constants/routes';

class TabBar extends Component {

    render() {

        return (
            <TabBarView>
                {[{
                    title : ` All Matches `,
                    icon : <MatchesIcon className="icon_inline" />,
                    route : ROUTE_CANDIDATE_MATCHES_ALL,
                    // action : routeToAll
                }, {
                    title : ` Bookmarked `,
                    icon : <BookmarkFill className="icon-bookmark-fill_size_small icon_inline" />,
                    route : ROUTE_CANDIDATE_MATCHES_BOOKMARKED,
                    // action : routeToBookmarked
                }, {
                    title: ` Not Interested `,
                    icon: <DeclineIcon className="icon_inline" />,
                    route: ROUTE_CANDIDATE_MATCHES_NOT_INTERESTED,
                    // action : routeToNotInterested
                }]}
            </TabBarView>
        )
    }

}

TabBar.propTypes = {
    activeTab : PropTypes.string,
    dispatch : PropTypes.func
}
TabBar.defaultProps = {}

export default TabBar
