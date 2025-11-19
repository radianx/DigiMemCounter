import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    center: {
        alignItems: "center",
    },
    landscape: {
        flexDirection: "column",
        flex: 1,
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    playerRow: {
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        flexDirection: "row",
    },
    mainRow: {
        flexDirection: "row",
        width: "100%",
        height: "60%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 25,
    },
    row: {
        width: "100%",
        height: "50%",
        flexDirection: "row",
    },
    reverseRow: {
        flexDirection: "row-reverse",
        width: "100%",
        height: "50%",
    },
    cell: {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    side: {
        flex: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    middle: {
        height: "50%",
        width: "9%",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "#fff",
        height: "100%",
    },
    text: {
        color: "#fff",
        fontFamily: "OpenSansRegular",
    },
    greet: {
        color: "#000",
    },
    textBold: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "OpenSansBold",
    },
    timeText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "NotoSansMono",
    },
});
