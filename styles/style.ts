import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#1b1630",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f7f2fbff",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#2c2145",
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#9b59ff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bookItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2a2140",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    flexShrink: 1,
  },
  lido: {
    textDecorationLine: "line-through",
    color: "#69ff52ff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBtn: {
    marginRight: 12,
    fontWeight: "600",
    fontSize: 14,
    color: "#9b59ff",
  },
  deleteBtn: {
    fontWeight: "600",
    fontSize: 14,
    color: "#ff5c5c",
  },
});

export default styles;
