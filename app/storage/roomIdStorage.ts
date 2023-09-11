const ROOM_ID_KEY = "roomId";

export function setRoomId(chatId: string) {
    localStorage.setItem(ROOM_ID_KEY, chatId);
}
export function getRoomId () {
    if (typeof window !== 'undefined') {
        const id = localStorage.getItem(ROOM_ID_KEY);
        return id ? id : null;
    }
    else {
        return null;
    }
}