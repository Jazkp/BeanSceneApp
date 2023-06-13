import * as React from "react";
import { Button } from "react-native-paper";

export default function TableButton({ navigation, params }) {
  return (
    <Button
      icon="table-chair"
      mode="contained"
      contentStyle={{ flexDirection: "row-reverse" }}
      style={{ width: 100, margin: 4 }}
    ></Button>
  );
}

const [hashedPassword, setHashedPassword] = useState("");

const password = "password123";

hash(password, 10) // '10' is the number of salt rounds
  .then((hashedPassword) => {
    // Store the hashedPassword in your database or use it as needed
    setHashedPassword(hashedPassword);
  })
  .catch((error) => {
    console.error("Error hashing password:", error);
  });
