import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const Keypad = ({ number, setState }) => (
  <View
    style={{
      width: 80,
      height: 70,
      alignItems: "flex-end",
      marginHorizontal: 20,
      marginVertical: 20,
    }}
  >
    <Pressable
      onPress={() => {
        if (number === "X") {
          setState((oldarray) => [...oldarray.slice(0, -1)]);
        } else {
          setState((oldarray) => [...oldarray, number]);
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 50,
          fontWeight: "700",
        }}
      >{`${number}`}</Text>
    </Pressable>
  </View>
);

export default function NumericalKeypad({ setStateFunc }) {
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    let check = [...display];
    check.sort();
    if (check[0] === "." && check[1] === ".") {
      console.log("it happened!");
      display.pop();
      setDisplay(display);
    }
    if (display.at(-4) === ".") {
      display.pop();
      setDisplay(display);
    }
    console.log(display.at(-3));
    setStateFunc(display.join(""));
  }, [display]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={styles.row}>
          <Keypad number={1} setState={setDisplay} />

          <Keypad number={2} setState={setDisplay} />
          <Keypad number={3} setState={setDisplay} />
        </View>
        <View style={styles.row}>
          <Keypad number={4} setState={setDisplay} />
          <Keypad number={5} setState={setDisplay} />
          <Keypad number={6} setState={setDisplay} />
        </View>
        <View style={styles.row}>
          <Keypad number={7} setState={setDisplay} />
          <Keypad number={8} setState={setDisplay} />
          <Keypad number={9} setState={setDisplay} />
        </View>
        <View style={styles.row}>
          <Keypad number={"."} setState={setDisplay} />
          <Keypad number={0} setState={setDisplay} />
          <Keypad number={"X"} setState={setDisplay} />
        </View>
        <Pressable onPress={() => console.log(display)}></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
