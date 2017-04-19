require('jasmine-co').install()

import {
    addObjectToArray,
    addStringToArrayUnique,
    removeStringFromArray
} from './../../reducers/stateProcessing'

const expect = chai.expect

describe('State processing', () => {
    it('Should add first element to an empty array', () => {
        const source = {
            item: 'itemText',
            array: []
        }
        const expected = {
            item: 'itemText',
            array: [
                {
                    id: 1,
                    text: 'text'
                }
            ]
        }
        const itemToAdd = {
            id: 1,
            text: 'text'
        }
        const arrayName = 'array'

        const returned = addObjectToArray(source, arrayName, itemToAdd)
        expect(returned).to.be.deep.equal(expected)
    })

    it('Should add a named array item', () => {
        let source = {
            item: 'textValue',
            objectItem: {
                key1: 'test2',
                key2: 'test4'
            },
            arrayItem: [
                {
                    id: 1,
                    text: 'text'
                }
            ],
            arrayItem2: [
                {
                    id: 2,
                    text: 'text'
                }
            ]
        }
        let expected = {
            item: 'textValue',
            objectItem: {
                key1: 'test2',
                key2: 'test4'
            },
            arrayItem: [
                {
                    id: 1,
                    text: 'text'
                },
                {
                    id: 10,
                    text: 'added'
                }
            ],
            arrayItem2: [
                {
                    id: 2,
                    text: 'text'
                }
            ]
        }

        const itemToAdd = {
            id: 10,
            text: 'added'
        }
        const itemName = 'arrayItem'

        const returned = addObjectToArray(source, itemName, itemToAdd)

        expect(returned).to.deep.equal(expected)
    })

    describe('Modify array', () => {
        it('Should add string', () => {
            let source = {
                item1: 'value1',
                array1: [
                    'item1',
                    'item2',
                    'item3'
                ]
            }

            let expected = {
                item1: 'value1',
                array1: [
                    'item1',
                    'item2',
                    'item3',
                    'itemToAdd'
                ]
            }

            const arrayName = 'array1'
            const stringToAdd = 'itemToAdd'

            const returned = addStringToArrayUnique(source, arrayName, stringToAdd)

            expect(returned).to.deep.equal(expected)
        })

        it('Shouldn\'t add any string', () => {
            let source = {
                item1: 'value1',
                array1: [
                    'item1',
                    'item2',
                    'item3',
                    'itemToAdd'
                ]
            }

            let expected = {
                item1: 'value1',
                array1: [
                    'item1',
                    'item2',
                    'item3',
                    'itemToAdd'
                ]
            }

            const arrayName = 'array1'
            const stringToAdd = 'itemToAdd'

            const returned = addStringToArrayUnique(source, arrayName, stringToAdd)

            expect(returned).to.deep.equal(expected)
        })

        it('Should remove string', () => {
            let source = {
                item1: 'value1',
                array1: [
                    'item1',
                    'item2',
                    'item3',
                    'itemToRemove'
                ]
            }

            let expected = {
                item1: 'value1',
                array1: [
                    'item1',
                    'item2',
                    'item3'
                ]
            }

            const arrayName = 'array1'
            const stringToRemove = 'itemToRemove'

            const returned = removeStringFromArray(source, arrayName, stringToRemove)

            expect(returned).to.deep.equal(expected)
        })
    })

})
