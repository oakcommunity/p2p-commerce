import React, { useState } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../utils/supabase";

export default function ProfileScreen() {
  return (
    <View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
