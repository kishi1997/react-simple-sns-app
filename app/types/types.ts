// 登録情報の型
export type UserData = {
    user: {
        id: number,
        name: string,
        email: string,
        iconImageUrl: string
    },
    token: string
}