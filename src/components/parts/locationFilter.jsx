import co from 'co'
import {fetchPlaces} from '../../sagas/companyOnboarding'

export default function({ value }) {
    const { dispatch, onFilter, onClickListItem } = this.props

    onFilter({ dispatch, value })
    return co(function * () {
        const places = yield fetchPlaces(value)
        const list = places.sort().slice(0, 5).map((place) => {
            const title = `${place.city}, ${place.state}`

            return {
                title,
                onClick : (event) => {
                    onClickListItem({
                        dispatch,
                        place,
                        filter : this.filter
                    })
                }
            }
        })

        this.setState({
            list
        })
    }.bind(this))
}

