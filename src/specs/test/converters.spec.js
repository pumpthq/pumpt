require('jasmine-co').install()
import {apiEnumToListData} from './../../utils/'
import {LIST_ITEM_TYPE_GROUP, LIST_ITEM_TYPE_USER_ENTERED} from './../../components/main/list2'

const expect = chai.expect

describe('Converters', () => {
    describe('API enum to list data', () => {
        it('One group correct list: user entered item', () => {
            const source = [
                {
                    id: '123123',
                    name: 'ThisIsName',
                    title: 'ThisIsTitle',
                    type: 'group',
                    items: [
                        {
                            id: '234234',
                            name: 'ThisIsTitle',
                            title: 'ThisIsTitle',
                            alternative: true
                        }
                    ]
                }
            ]
            const expected = [
                {
                    key: '123123',
                    id: '123123',
                    name: 'ThisIsName',
                    text: 'ThisIsTitle',
                    type: LIST_ITEM_TYPE_GROUP,
                    items: [
                        {
                            key: '234234',
                            id: '234234',
                            name: 'ThisIsTitle',
                            value: 'ThisIsTitle',
                            text: 'ThisIsTitle',
                            type: LIST_ITEM_TYPE_USER_ENTERED
                        }
                    ]
                }
            ]
            let returned = apiEnumToListData(source)
            expect(returned).to.be.an('array')
            expect(returned).to.deep.equal(expected)
        })
    })
})
