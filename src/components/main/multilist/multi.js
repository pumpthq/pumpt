import React, { Component, PropTypes } from 'react';
import { MultiItemGroup } from './index';
import './multi.less'

class MultiselectComponent extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
    this.isGroupOpened = this.isGroupOpened.bind(this);
    this.getParent = this.getParent.bind(this);

    const { preselectedItems } = props;
    const selectedItems = preselectedItems
      .reduce((acc, item) => acc.set(item.id, item), new Map());

    this.state = {
      selectedItems,
      openGroupId: null,
    };
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
      { selectedItems } = this.state;


    return (
            <ul className={this.makeClassName()}>
            {
                items.map((group) => {
                  const groupClickable = selectedItems.length === 0 ||
                    Array.from(selectedItems.values())
                    .reduce((acc,item) => acc && item.parent.id  === group.id, true);
                  return (
                        <MultiItemGroup
                          {...group}
                          onValueChange={this.handleValueChange}
                          onGroupClick={this.handleGroupClick}
                          selectedItems={selectedItems}
                          handleGroups={handleGroups}
                          isOpened={this.isGroupOpened(group.id)}
                          isActive={groupClickable}
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
