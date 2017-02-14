import co from 'co'
import { fetchUniversity } from '../../sagas/candidateApplication'

export default function({ value }) {
    const { dispatch, onFilter, onClickListItem } = this.props

    onFilter({ dispatch, value })
    return co(function * () {
        const schools = yield fetchUniversity(value)
        const list = schools.sort().slice(0, 5).map((school) => {
            const item = `${school.city}, ${school.state}`

            return {
                title : `${school.name}<br/>${item}`,
                onClick : (event) => {
                    onClickListItem({
                        dispatch,
                        school,
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
