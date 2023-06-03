export interface FriendshipDto {
    status:  string;
    message: string;
    data:    Datum[];
}

export interface Datum {
    user:   string;
    friend: string;
    status: string;
}
