import React, {Component, PropTypes} from 'react'
import {TabBar as TabBarView} from '../../../../components/matches'

import {routeToClosed, routeToDrafts, routeToOpen} from './../../../../actions/companyJobs';

import {
    ROUTE_COMPANY_JOBS_CLOSED,
    ROUTE_COMPANY_JOBS_DRAFTS,
    ROUTE_COMPANY_JOBS_OPEN
} from './../../../../constants/routes';

class TabBar extends Component {

    render() {

        return (
            <TabBarView>
                {[{
                    title : ` Open Jobs `,
                    route : ROUTE_COMPANY_JOBS_OPEN,
                    action : routeToOpen
                }, {
                    title : ` Drafts `,
                    route : ROUTE_COMPANY_JOBS_DRAFTS,
                    action : routeToDrafts
                }, {
                    title: ` Closed Jobs `,
                    route: ROUTE_COMPANY_JOBS_CLOSED,
                    action : routeToClosed
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
