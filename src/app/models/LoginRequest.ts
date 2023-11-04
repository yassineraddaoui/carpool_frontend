export class LoginRequest {
    email='';
    password='';
    constructor(email:string,password:string){
        this.email=email;
        this.password=password;
    }
}
