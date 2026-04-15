export class Food {
    id! : number;
    name! : string;
    description? : string;
    vegeterian? : boolean;
    spiciness? : number;
    rate? : number;
    price? : number;
    image? : string;
    canDelete! : boolean;
}
export class Category {
    id! : number;
    name! : string;
    canDelete! : boolean;
}


//     canDelete
// : 
// false
// id
// : 
// 6
// name
// : 
// "Desserts"
// {
//         "id": 48,
//         "name": "Sfogliatelle",
//         "description": "Flaky, shell-shaped pastries filled with sweet ricotta and candied citrus.",
//         "vegeterian": false,
//         "spiciness": 0,
//         "rate": 2.7,
//         "price": 8,
//         "image": "https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7LoztrfwCRVF4SABcXupCwhg0b9soOl6T2x5n",
//         "canDelete": false
//       },