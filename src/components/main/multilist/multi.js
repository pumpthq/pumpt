import React, {Component, PropTypes} from 'react';
import {MultiItemGroup} from './index';
import './multi.less'

const LIST_ITEM_TYPE_TEXT = 'list.item.type.text'
const makeItem = (value, parentId) => {
  return {
     id: value,
     value: value, 
     text: value,
     name: value,
     key: value,
     groupId: parentId,
     type: LIST_ITEM_TYPE_TEXT
  }
};

class MultiselectComponent extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
    this.isGroupOpened = this.isGroupOpened.bind(this);
    this.getParent = this.getParent.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.inItems = this.inItems.bind(this);

    const { preselectedItems, items } = props;
    const selectedItems = preselectedItems
      .reduce((acc, item) => acc.set(item.id, item), new Map());
    const additionalItems = preselectedItems
      .filter(p => !this.inItems(p.id,p.parent.id)).map(i => makeItem(i.value, i.parent.id));
    const openId = preselectedItems.length === 0  ? null : preselectedItems[0].parent.id;

    this.state = {
      selectedItems,
      openGroupId: openId,
      additionalItems // created by 'Other' fillins
    };
  }

  inItems(probeID, parentID) {
    const {items} = this.props;
    let g = items.find( g => g.id===parentID );
    if (g) {
      return !!items.find( i => i.id === probeID);
    }

    return false;
  }

  componentDidMount() {
    const { preselectedItems } = this.props;
    if (preselectedItems && preselectedItems.length > 0) {
      const parent = this.getParent(preselectedItems[0].id);
      this.setState({ openGroupId: parent.id });
    }
  }

  makeClassName() {
    const { classesToAdd } = this.props;
    let finalClassName = 'multi';

    classesToAdd.forEach((className) => {
      finalClassName += ` ${className}`;
    });

    return finalClassName;
  }

  render() {
    const { items, handleGroups, classesToAdd, otherPlaceholder } = this.props,
      { selectedItems, additionalItems } = this.state;


    return (
            <ul className={this.makeClassName()}>
            {
                items.map((group) => {
                  const groupClickable = selectedItems.length === 0 ||
                    Array.from(selectedItems.values())
                    .reduce((acc,item) => acc && item.parent.id  === group.id, true);
                  const groupAdditions = additionalItems.filter(i => i.groupId === group.id);

                  return (
                        <MultiItemGroup
                          {...group}
                          additionalItems={groupAdditions}
                          onValueChange={this.handleValueChange}
                          onGroupClick={this.handleGroupClick}
                          selectedItems={selectedItems}
                          handleGroups={handleGroups}
                          isOpened={this.isGroupOpened(group.id)}
                          isActive={groupClickable}
                          classesToAdd={classesToAdd}
                          otherPlaceholder={otherPlaceholder}
                          handleEnter={this.handleEnter}
                        />
                    );
                })
            }
            </ul>
        );
  }

  handleEnter(otherId, value, parentId) {
    const { items, listValuesSelected } = this.props
    const { selectedItems, additionalItems} = this.state
    let parent = items.find(g => g.id === parentId);
    parent = {id: parent.id, value: parent.text}

    const newItem = makeItem(value, parentId);

    selectedItems.delete(otherId); // deselect Other to select created tag
    this.setState({
      additionalItems: additionalItems.concat([newItem]),
      selectedItems: selectedItems.set(value, {id: value, value: value, parent: parent})
    })

    this.props.listValuesSelected(Array.from(this.state.selectedItems.values()));
  }
  
  handleGroupClick(groupId) {
    this.setState({ openGroupId: groupId });
  }

  handleValueChange({ id, value }) {
    const { selectedItems } = this.state,
      parent = this.getParent(id);
    // If the item is already in the list, then it's being toggled off. Delete
    // it.
    // But if the item has changed in value, it's probably user-entered text.
    // Don't delete it, update the value.
    if (selectedItems.has(id)
      && selectedItems.get(id).value === value) {
      selectedItems.delete(id);
      this.setState({ selectedItems });
    } else {
      this.setState({
        selectedItems: selectedItems.set(id,
          {
            id,
            value,
            parent,
          }),
      });
    }

    this.props.listValuesSelected(Array.from(this.state.selectedItems.values()));
  }

  isGroupOpened(groupId) {
    return groupId === this.state.openGroupId;
  }

  // getParent assumes one level of nesting
  getParent(itemId) {
    const { items } = this.props,
      parent = {
        id: '',
        value: '',
      };
    items.forEach((group) => {
      const groupItems = group.items;
      groupItems.forEach((item) => {
        if (item.id === itemId) {
          parent.id = group.id;
          parent.value = group.text;
          return;
        }
      });
    });
    return parent;
  }
}

MultiselectComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  classesToAdd: PropTypes.arrayOf(PropTypes.string),
  allowNoSelection: PropTypes.bool,
  listValuesSelected: PropTypes.func,
  preselectedItems: PropTypes.array,
  handleGroups: PropTypes.bool,
  otherPlaceholder: PropTypes.string,
};

MultiselectComponent.defaultProps = {
  items: [],
  classesToAdd: [],
  allowNoSelection: true,
  listValuesSelected: () => {},
  preselectedItems: [],
  handleGroups: false,
  otherPlaceholder: '',
};

export default MultiselectComponent;
