import { useState, useEffect } from "react";
import { Badge, Button, Modal, Portal, Text } from "react-native-paper";
import { View } from "react-native";
import { fetchProducts, postOrder } from "../services/apiCalls";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MenuScreen() {
  //navigation
  const navigation = useNavigation();
  const route = useRoute();
  //state
  const [table, setTable] = useState(route?.params?.table);
  const [order, setOrder] = useState(route?.params?.order ?? {});
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [visible, setVisible] = useState(false);

  // new states - modal
  const [modalData, setModalData] = useState({});
  const [count, setCount] = useState(0);
  const [totalOrder, setTotalOrder] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);

  //hooks
  useEffect(() => {
    (async () => {
      let products = await fetchProducts();
      let courses = products
        .flatMap((j) => j.Sittings)
        .filter((x, i, a) => a.indexOf(x) === i);
      setCourses(courses);
      setProducts(products);
    })();
  }, []);

  // functions - modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const style = { backgroundColor: "#2f170f", padding: 20 };

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count - 1);

  function handleModalOpen(product) {
    // data == {product}
    const item = currentSelection.find((p) => p.item === product);
    if (item) {
      setCount(item.qty);
    } else {
      setCount(0);
    }
    setModalData(product);
    showModal();
  }

  function confirmItem() {
    const index = currentSelection.findIndex(
      (plate) => plate.item.name === modalData.name
    );
    if (index === -1) {
      setCurrentSelection([
        ...currentSelection,
        { item: modalData, qty: count },
      ]);
    } else if (index !== -1) {
      currentSelection[index].qty = count;
      setCurrentSelection(currentSelection);
    }
    hideModal();
    setCount(0);
  }

  // functions

  return (
    <View style={{ backgroundColor: "#f6e1c5", flex: 1, padding: 20 }}>
      <View>
        <Text variant="titleMedium" style={{ color: "black" }}>
          ORDER - TABLE: {table}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          padding: 5,
          margin: 5,
          backgroundColor: "#e6a756",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {courses.map((c) => (
          <Button
            style={{ marginHorizontal: 30 }}
            textColor="black"
            key={c}
            onPress={() => setSelectedCourse(c)}
          >
            <Text style={{ color: "black" }}>{c}</Text>
          </Button>
        ))}
      </View>
      <View style={{ backgroundColor: "#f6e1c5" }}>
        {products
          .filter((p) => p.Sittings.indexOf(selectedCourse) > -1)
          .map((p) => (
            <Button
              textColor="black"
              key={p.name}
              onPress={() => handleModalOpen(p)}
            >
              <Text style={{ color: "black" }}>{p.name}</Text>
            </Button>
          ))}
      </View>
      <Button
        mode="contained"
        buttonColor="#e6a756"
        textColor="black"
        onPress={() => {
          navigation.navigate("Confirmation", { currentSelection, table });
        }}
      >
        Confirm Order
      </Button>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={style}
          >
            <View>
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  fontSize: 25,
                  color: "white",
                }}
              >{`${modalData.name} - $${modalData.prices}`}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  mode="contained"
                  style={{ marginBottom: 6, width: 50 }}
                  buttonColor="#e6a756"
                  textColor="black"
                  onPress={handleDecrease}
                >
                  -
                </Button>
                <Badge
                  size={30}
                  style={{
                    color: "black",
                    backgroundColor: "#e6a756",
                    marginBottom: 6,
                  }}
                >
                  {count}
                </Badge>
                <Button
                  mode="contained"
                  style={{ marginBottom: 6, width: 40 }}
                  buttonColor="#e6a756"
                  textColor="black"
                  onPress={handleIncrease}
                >
                  +
                </Button>
              </View>
              <Button
                mode="contained"
                buttonColor="#e6a756"
                textColor="black"
                onPress={() =>
                  confirmItem({
                    item: setCurrentSelection,
                    qty: count,
                  })
                }
              >
                Confirm
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </View>
  );
}
