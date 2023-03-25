import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";

export default function QRScreen() {
  const { walletData } = useSelector((state) => state.users);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const dataString = data.toString();
    const addressVerify = dataString.split(",")[0].split("=")[0];
    const address = dataString.split(",")[0].split("=")[1];
    const amountVerify = dataString.split(",")[1].split("=")[0];
    const amount = dataString.split(",")[1].split("=")[1];

    if (address && addressVerify === "address") {
      console.log("address: ", address);
    }
    if (amount && amountVerify === "amount") {
      console.log("send: ", amount);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scanner}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
      <QRCode value={`address=${walletData.address},amount=${1}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: {
    height: 400,
    width: 300,
  },
});
