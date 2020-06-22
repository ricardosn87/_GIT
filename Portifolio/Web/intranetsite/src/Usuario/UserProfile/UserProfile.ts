export class UserProfile {

    Email: string

    constructor({ });
    constructor(Email: string) {
        this.Email = Email
    }

    SetLoginStorage() {
        localStorage.setItem('login', this.Email);
    }

    GetLoginStorage() {
        return localStorage.getItem('login');
    }
}


