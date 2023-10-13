export default {
    ALL: "0", // 期間内のすべての予約情報
    DURING_RESERVATION: "1", // 現在予約中の情報のみ
    DURING_RESERVATION_CHANGE: "2", // 現在予約中の情報の中から1度以上変更された予約情報
    CANCELED: "3", // すでに取消処理がされた予約情報
}
