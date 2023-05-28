//const baseApi = "http://10.0.2.2:5208";
const baseApi = "https://localhost:7060";
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
    const response = await fetch(`${baseApi}/api/order/tables`);

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
