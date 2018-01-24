import React, { Component, PropTypes } from 'react'
import { TabBar as TabBarView } from '../../../../components/matches'
import CaseFillIcon from '../../../../components/icons/CaseFill';
import CaseEmptyIcon from '../../../../components/icons/CaseEmpty';
import OkFillIcon from '../../../../components/icons/OkFill';

import {
    routeToOpen,
    routeToDrafts,
    routeToClosed
} from './../../../../actions/companyJobs';

import {
    ROUTE_COMPANY_JOBS_OPEN,
    ROUTE_COMPANY_JOBS_DRAFTS,
    ROUTE_COMPANY_JOBS_CLOSED
} from './../../../../constants/routes';

class TabBar extends Component {

    render() {

        return (
            <TabBarView>
                {[{
                    title : ` Open Jobs `,
                    icon : <CaseFillIcon className="con-case-fill_size_small icon_inline" />,
                    route : ROUTE_COMPANY_JOBS_OPEN,
                    action : routeToOpen
                }, {
                    title : ` Drafts `,
                    icon : <CaseEmptyIcon className="icon-case-empty_size_small icon_inline" />,
                    route : ROUTE_COMPANY_JOBS_DRAFTS,
                    action : routeToDrafts
                }, {
                    title: ` Closed Jobs `,
                    icon: <OkFillIcon className="icon-ok-fill_size_small icon_inline"/>,
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
