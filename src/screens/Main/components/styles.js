import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    playerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "20%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    textBold: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "OpenSansBold",
    },
    text: {
        fontSize: 18,
        color: "#aaa",
        fontFamily: "OpenSansRegular",
    },
    side: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
    },
    reverseRow: {
        flexDirection: "row-reverse",
    },
    cell: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    timeText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "NotoSansMono",
    },
});

