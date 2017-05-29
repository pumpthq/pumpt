import uuid from 'uuid'
import {
    INDUSTRY_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    ANNUAL_INCOME_DROPDOWN_DATA,
    COMPANY_SIZE_DROPDOWN_DATA,
    VALUE_ASSESSMENTS_DROPDOWN_DATA
} from './candidateOnboarding'

import {
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA
} from './companyOnboarding'
import {
    DEGREES_DROPDOWN_DATA,
    EMPLOYEMENTS_DROPDOWN_DATA
} from './companyJobs';

export const assignId = ({ data, parent = null }) => {
    return data.map((element) => {
        element.id = uuid.v4()
        element.parent = parent
        
        if (element.items) {
            return assignId({ data : element.items, parent : element})
        }
        
        return element
    })
}

export const findById = ({ id, data }) => {
    const arr = []
    const _findById = ({ id, data, parent = null }) => {

        for (let itData = data.length; itData--;) {
            const element = data[itData]

            element.parent = parent
            if (element.id === id) {
                arr.push(Object.assign({}, element))
                break;
            }

            if (element.items) {
                _findById({
                    id,
                    data : element.items,
                    parent : element
                })
            }
        }
    }
    
    _findById({ id, data })
    return arr.pop()
}

export const findSequence = ({ path = [], nestedListing = [] }) => {
    let arr = []

    const _deepFindIn = ({ it = 0, listing }) => {
        const partOfPath = path[it]

        for (let itListing = 0; itListing < listing.length; itListing++) {
            const partOfList = listing[itListing]

            // if titles is equals or if item of last iteration
            if (partOfPath === partOfList.title || itListing === listing.length - 1) {
                arr.push(partOfList)
                const itemsOfPartList = partOfList.items

                if (itemsOfPartList) {
                    _deepFindIn({ it : it + 1, listing : itemsOfPartList })
                }
                break
            }
        }
    }

    _deepFindIn({ listing : nestedListing })

    return arr
}

[
    INDUSTRY_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    ANNUAL_INCOME_DROPDOWN_DATA,
    COMPANY_SIZE_DROPDOWN_DATA,
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA,
    EMPLOYEMENTS_DROPDOWN_DATA,
    DEGREES_DROPDOWN_DATA,
    VALUE_ASSESSMENTS_DROPDOWN_DATA
].forEach((data) => {
    assignId({ data })
})
