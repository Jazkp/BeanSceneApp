import { Platform } from "react-native";

const baseApi = getServerAddress();

export async function fetchProducts() {
  try {
    const response = await fetch(`${baseApi}/api/Product`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("BAD:", error);
    throw error;
  }
}

export async function getRestaurantTables() {
  try {
    const response = await fetch(`${baseApi}/api/table/tables`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export async function getBreakfast(sitting) {
  try {
    const response = await fetch(`${baseApi}/api/Product/sitting/${sitting}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${baseApi}/api/Product/${id}`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export async function postOrder(table, currentSelection, totalPrice) {
  // variables

  let qty, name, price, size, vegan;
  //functions
  const now = new Date();
  const date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDay();
  const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

  // Structuring the DB model

  let order = {
    table: table,
    items: [],
    totalPrice: totalPrice,
    timestamp: `${date} ${time}`,
  };
  //Loop through all items and adding them to items array
  // deconstructing currentSelection

  for (let i = 0; i < currentSelection.length; i++) {
    const element = currentSelection[i];
    const { name, prices, vegan, sizes } = element.item;
    element.qty;
    const { qty } = element.qty;
    order.items.push({
      name,
      price: prices,
      quantity: element.qty,
      vegan,
      size: sizes,
    });
  }

  // API code
  const response = await fetch(`${baseApi}/api/Order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
}

function getServerAddress() {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:5057";
  } else if (Platform.OS === "web") {
    return "https://localhost:7168";
  } else {
    throw new Error("Unsupported platform!");
  }
}
