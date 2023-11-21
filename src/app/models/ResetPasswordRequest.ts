export class ResetPasswordRequest {
    confirmationPassword?:string;
    newPassword?:string;

  constructor(confirmationPassword:any,newPassword:any){
        this.confirmationPassword=confirmationPassword;
        this.newPassword=newPassword;
    }
}
