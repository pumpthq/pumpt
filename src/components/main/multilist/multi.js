import React, { Component, PropTypes } from 'react';
import { MultiItemGroup } from './index';

class MultiselectComponent extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
    this.toggleGroup = this.toggleGroup.bind(this);
    this.isGroupOpened = this.isGroupOpened.bind(this);
    this.getParent = this.getParent.bind(this);

    const { preselectedItems } = props;
    const selectedItems = preselectedItems
      .reduce((acc, item) => acc.set(item.id, item), new Map());

    this.state = {
      selectedItems,
      openGroupsId: [],
    };
  }

  componentDidMount() {
    const { preselectedItems } = this.props;
    if (preselectedItems && preselectedItems.length > 0) {
      const parent = this.getParent(preselectedItems[0].id);
      this.setState({ openGroupsId: this.toggleGroup(parent.id) });
    }
  }

  makeClassName() {
    const { classesToAdd } = this.props;
    let finalClassName = 'list';

    classesToAdd.forEach((className) => {
      finalClassName += ` ${className}`;
    });

    return finalClassName;
  }

  render() {
    const { items, handleGroups, classesToAdd, otherPlaceholder } = this.props,
      { selectedItems } = this.state;

    return (
            <ul className={this.makeClassName()}>
            {
                items.map((group) => {
                  return (
                        <MultiItemGroup
                          {...group}
                          onValueChange={this.handleValueChange}
                          onGroupClick={this.handleGroupClick}
                          selectedItems={selectedItems}
                          handleGroups={handleGroups}
                          isOpened={this.isGroupOpened(group.id)}
                          classesToAdd={classesToAdd}
                          otherPlaceholder={otherPlaceholder}
                        />
                    );
                })
            }
            </ul>
        );
  }

  handleGroupClick(groupId) {
    this.setState({ openGroupsId: this.toggleGroup(groupId) });
  }

  handleValueChange({ id, value }) {
    const { selectedItems } = this.state,
      parent = this.getParent(id);
    // If the item is already in the list, then it's being toggled off. Delete
    // it.
    // But if the item has changed in value, it's probably user-entered text.
    // Don't delete it, update the value.
    if (selectedItems.has(id) && selectedItems.size > 1 
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

  toggleGroup(groupIdClicked) {
    const { openGroupsId } = this.state,
      newOpenGroupsId = [];
    let wasItemInLIst = false;
    openGroupsId.forEach((groupId) => {
      if (groupId === groupIdClicked) {
        wasItemInLIst = true;
      } else {
        newOpenGroupsId.push(groupId);
      }
    });
    if (!wasItemInLIst) {
      newOpenGroupsId.push(groupIdClicked);
    }
    return newOpenGroupsId;
  }

  isGroupOpened(groupId) {
    const { openGroupsId } = this.state;
    let wasGroupFind = false;
    openGroupsId.forEach((listGroupId) => {
      if (listGroupId === groupId) {
        wasGroupFind = true;
      }
    });
    return wasGroupFind;
  }

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
