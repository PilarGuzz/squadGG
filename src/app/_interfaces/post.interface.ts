export interface Post{
    title: string,
    description: string,
    region: string,
    nickgame: string,
    levelingame: string,
    ranklevel: string,
    username: string,
    gamename: string,
    datepublication: number[],
    dateformated: string,
    img: string,
    id: number
    
  }
  export  interface PostApi {
    title: string;
    description: string;
    datepublication: [number, number, number, number, number];
    region: string;
    nickgame: string;
    levelingame: string;
    ranklevel: string;
  }