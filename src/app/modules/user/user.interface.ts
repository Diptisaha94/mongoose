import { Schema, model, connect } from 'mongoose';
export interface Fullname{
    firstName: string,
    lastName: string
}
export interface Address {
    street: string;
    city: string;
    country: string;
}

export interface Order {
    productName: string;
    price: number;
    quantity: number;
}
export interface User{
        userId: number,
        username: string,
        password: string,
        fullName: Fullname,
        age: number,
        email: string,
        isActive: true | false,
        hobbies: string[];
        address: Address;
        orders?: Order[];
}