
export interface User {
    username: string,
    email: string,
    password: string,
    birth: Date,
    img: string

}


export interface Post {
    title: string;
    description: string;
    datepublication: number[];
    region: string;
    nickgame: string;
    levelingame: string;
    ranklevel: string;
}

export interface Game {
    username: string;
}

export interface Authority {
    authority: string;
}

export interface UserApiContent {
    username: string;
    password: string;
    email: string;
    role: string;
    img: string;
    enabled: boolean;
    posts: Post[];
    games: Game[];
    birth: number[];
    verificationcode: string;
    authorities: Authority[];
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort2 {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface UserApi {
    content: UserApiContent[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort2;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}



