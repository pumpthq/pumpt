import {LIST_ITEM_TYPE_GROUP, LIST_ITEM_TYPE_TEXT, LIST_ITEM_TYPE_USER_ENTERED} from './../components/main/list2'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const apiEnumToListData = (initialData) => {
    let listData = []
    let groupData = []
    initialData.map((group) =>{
        groupData = []
        group.items.map((item) =>{
            groupData.push({
                key: item.id,
                id: item.id,
                name: item.title,
                value: item.title,
                text: item.title,
                type: item.alternative ? LIST_ITEM_TYPE_USER_ENTERED : LIST_ITEM_TYPE_TEXT
            })
        })
        listData.push({
            key: group.id,
            id: group.id,
            name: group.name,
            text: group.title,
            type: LIST_ITEM_TYPE_GROUP,
            items: groupData
        })
    })

    return listData
}

const cityToGeocode = (city) => {
  return geocodeByAddress(city)
    .then(results => getLatLng(results[0]))
}

export {
  apiEnumToListData,
  cityToGeocode
}
