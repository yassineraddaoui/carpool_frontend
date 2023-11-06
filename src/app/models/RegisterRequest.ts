export class RegisterRequest {
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: string;

    constructor(firstName: string, lastName: string, email: string, password: string, role: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
