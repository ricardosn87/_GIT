/* export interface User {
    firstname:string
    lastname:string
    address:string
    city:string
    state:string
    phone:string
    mobilephone:string
    email:string
    password:string
    token:string
    _id?:string
}
 */
export class User {
    firstname:string
    lastname:string
    address:string
    city:string
    state:string
    phone:string
    mobilephone:string
    email:string
    password:string
    token:string
    _id?:string

    /**
     *
     */
    constructor(firstname:string,lastname:string,address:string,city:string,state:string,phone:string,mobilephone:string,email:string,password:string,token:string) {
      
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.mobilephone = mobilephone;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}


