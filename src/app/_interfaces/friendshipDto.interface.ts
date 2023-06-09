export interface FriendshipDto {
    status:  string;
    message: string;
    data:    FRequest[];
}

export interface FRequest {
    user:   string;
    friend: string;
    status: string;
}
