export interface User{
    name: string,
    email: string,
    password: string 
}
export interface loginUser{
    email: string,
    password: string 
}
export interface Product{
   productname : string,
   productprice: number,
   description: string,
   category :string,
   imgUrl : string,
   id : string
   quantity : undefined | number
}
export interface Cart{
    productname : string,
    productprice: number,
    description: string,
    category :string,
    imgUrl : string,
    quantity : undefined | number,
    productId : string,
    userId : string
 }
export  const url = 'http://localhost:3000/'