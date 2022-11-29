export type Product={
    id:number,
    _id:string,
    description:string,
    image:string,
    name:string,
    price:string,
    quantity:number,
    rating:{
        rate:number,
        count:number
    }
}