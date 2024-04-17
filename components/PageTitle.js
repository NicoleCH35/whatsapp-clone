import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default PageTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.offBlack,
  },
});
