/* eslint-disable no-empty-pattern */
export class UserProfile {

    Email: string

    constructor({ });
    constructor(Email: string) {
        this.Email = Email
    }

    SetLoginStorage() {
        if (this.Email !== '')
            localStorage.setItem('login', this.Email);
    }

    GetLoginStorage() {
        return localStorage.getItem('login');
    }
}


