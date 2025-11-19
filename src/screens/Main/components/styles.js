import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    playerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
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
        gap: 10,
    },
    reverseRow: {
        flexDirection: "row-reverse",
        gap: 10,
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

