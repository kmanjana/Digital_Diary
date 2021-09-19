// export interface Post {
//     id: string;
//     title: string;
//     content: string;
//     imagePath: string;
//     creator: string;
//     postDate?: Date;
//   }
export class PostModel{
    constructor(
        public UserID :String,
        public title : String,
        public category : String,
        public review : String
    ){} 
}