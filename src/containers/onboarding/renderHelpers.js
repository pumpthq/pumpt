import React, {PropTypes} from 'react'
import List, {ListAccordion, ListItem, ListLink} from './../../components/main/list'
import AlternativeInput from './alternativeInput'
import uuid from 'uuid'

// StepListLink with checkbox

const StepListCheckLink = ({ item, activeItems, onClick, active }) => {
    return (
        <ListLink style={{color: 'black'}} {...{
            key : uuid.v4(),
            linkSize : 'xl',
            className: 'list__item__checkbox' + (active ? ' list__item__checkbox-checked' : '') ,
            onClick : (a) => {
                const selectedItem = {
                    id : item.id,
                    value : item.title
                }
                onClick(selectedItem);
            },
            active
        }}>{item.title}</ListLink>
    )
}

StepListCheckLink.propTypes = {
    item : PropTypes.object,
    activeItems : PropTypes.array,
    onClick : PropTypes.func,
    active: PropTypes.bool
}

StepListCheckLink.defaultProps = {
    activeItems: []
}

// Common StepListLink

const StepListLink = ({ item, activeItem, onClick }) => {
    return (
        <ListLink {...{
            key : uuid.v4(),
            linkSize : 'xl',
            onClick : () => {
                const selectedItem = {
                    id : item.id,
                    value : item.title,
                    parent : item.parent ? item.parent.title : null
                }

                onClick(selectedItem)
            },
            active : activeItem ? item.id === activeItem.id : true
        }}>{item.title}</ListLink>
    )
}

StepListLink.propTypes = {
    item : PropTypes.object,
    activeItem : PropTypes.object,
    onClick : PropTypes.func
}

const AlternativeListItem = ({ item, activeItem, onClick }) => {
    return (
        <ListItem {...{
            key : uuid.v4()
        }}>
            <AlternativeInput {...{
                item,
                activeItem,
                onClick
            }}/>
        </ListItem>
    )
}

AlternativeListItem.propTypes = {
    item : PropTypes.object,
    activeItem : PropTypes.object,
    onClick : PropTypes.func
}

const StepListAccordion = ({ item, activeItem, onClick }) => {
    return (
        <ListAccordion {...{
            linkSize : 'xl',
            label : item.title,
            onClick,
            selected : activeItem && activeItem.parent && activeItem.parent.id === item.id
        }}>
            { item.items ?
                <List {...{
                    type : 'sublayer'
                }}>
                    {item.items.map((subItem) => {
                        if (subItem.alternative) {
                            return (
                                <AlternativeListItem {...{
                                    item : subItem,
                                    activeItem,
                                    onClick
                                }}/>
                            )
                        }

                        return (
                            <StepListLink {...{
                                item : subItem,
                                activeItem,
                                onClick
                            }}/>
                        )
                    })}
                </List>
                :
                null
            }
        </ListAccordion>
    )
}

StepListAccordion.propTypes = {
    item : PropTypes.object,
    activeItem : PropTypes.object,
    onClick : PropTypes.func
}

const StepTopAccordion = ({ list, activeItem, onClick }) => {
    return (
        <List type='onboarding' sublayer>
            {list.map((item) => {
                if (item.alternative) {
                    return (
                        <AlternativeListItem {...{
                            key : uuid.v4(),
                            item,
                            activeItem,
                            onClick
                        }}/>
                    )
                }

                return (
                    <StepListAccordion {...{
                        key : uuid.v4(),
                        item,
                        activeItem,
                        onClick
                    }}/>
                )
            })}
        </List>
    )
}

StepTopAccordion.propTypes = {
    list : PropTypes.arrayOf(PropTypes.object),
    onClick : PropTypes.func,
    activeItem : PropTypes.object
}

const NavLinkLabel = function({ defaultLabel, value, item }) {
    if (!item) {
        return (
            <span>{defaultLabel}</span>
        )
    }

    const arrList = [item.parent ? item.parent.title : null, value || item.title]
    const str = []

    arrList.forEach((title, index) => {
        if (!title) return

        const strNb = title.replace(' ', '&nbsp;')

        if (index < arrList.length - 1) {
            return str.push(`${strNb} | <br/>`)
        }

        return str.push(strNb)
    })

    return (
        <span
            key={uuid.v4()}
            dangerouslySetInnerHTML={{
                __html : str.join('')
            }}
            style={{
                lineHeight : 1.3
            }}
        />
    )
}

NavLinkLabel.propTypes = {
    item : PropTypes.object,
    value : PropTypes.string,
    defaultLabel : PropTypes.string
}

export {
    StepListCheckLink,
    StepListLink,
    AlternativeListItem,
    StepListAccordion,
    StepTopAccordion,
    NavLinkLabel,
}
