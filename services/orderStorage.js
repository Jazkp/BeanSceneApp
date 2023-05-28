const storage = new Map();

export function addItemToOrder(tableId, name, quantity) {
  if (storage.has(tableId)) {
    const existingItems = storage.get(tableId);

    if (existingItems.has(name)) {
      const existingQty = existingItems.get(name);
      existingItems.set(name, existingQty + quantity);
    } else {
      existingItems.set(name, quantity);
    }
  } else {
    const items = new Map();
    items.set(name, quantity);

    storage.set(tableId, items);
  }
}

export function getItemsFromOrder(tableId) {
  if (storage.has(tableId)) {
    return storage.get(tableId);
  } else {
    // Should probably throw error, returning empty dictionary for now
    return new Map();
  }
}

export function getItemFromOrder(tableId, name) {
  if (storage.has(tableId)) {
    const existingItem = storage.get(tableId);
    if (existingItem.has(name)) {
      const existingQty = existingItem.get(name);
      return existingQty;
    }
  } else {
    return 0;
  }
}
