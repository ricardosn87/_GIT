

export class Person {
    name: string
    age: number
    address: string
    city: string
    country: string
    _id?: string

    constructor(name: string,age: number,address: string,city: string,country: string){
        this.name = name
        this.age = age
        this.address = address
        this.city = city
        this.country = country
    }
}