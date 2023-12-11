import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4b0082",
  },
  title: {},
  logo: {
    flex: 1,
    height: 90,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    color: "white",
  },
  button: {
    backgroundColor: "#ff6b6b",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "white",
  },
  footerLink: {
    color: "#ff6b6b",
    fontWeight: "bold",
    fontSize: 16,
  },
  navbar: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#800080",
  },
  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
