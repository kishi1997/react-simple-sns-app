export const formatDateJapanTime = (params:string): string => {
    const date = new Date(params).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    return date;
}
