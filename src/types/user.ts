export interface IUser {
    token: string,
    info: {
        id: string;
        email: string;
        address: string;
        account_type: string;
        full_name: string;
    }[]
}