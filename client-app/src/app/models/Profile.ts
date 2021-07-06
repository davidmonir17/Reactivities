import { User } from "./User";


export interface Profile{
    username:string;
    displayName:string;
    image?:string;
    bio?:string;
    followersCount:number;
    followingCount:number;
    following:boolean;
    photos?:photo[];
}
export class Profile implements Profile{
    constructor(user:User){
        this.username=user.username;
        this.displayName=user.displayName;
        this.image=user.image;
    
    }
}
export interface photo
{
    id:string;
    url:string;
    isMain:boolean
}

export interface UserActivity{
    id:string;
    title:string;
    category:string;
    date:Date;
}