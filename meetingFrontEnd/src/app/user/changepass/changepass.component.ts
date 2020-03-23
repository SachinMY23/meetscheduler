import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute,Router} from '@angular/router';
import {AppService} from './../../app.service'
import {Cookie} from 'ng2-cookies/ng2-cookies'

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
   public oldPass:any;
   public newPass:any;
   public confPass:any;

  constructor(public toastr:ToastrService,
    public router:Router,
    public _route:ActivatedRoute,
    public appService:AppService) { }

  ngOnInit() {
  }
  public userId=this._route.snapshot.params.userId;

  public goToUserview: any = () => {
    this.router.navigate([`/users/view/${Cookie.get('receiverId')}`])
  }
  public goToAdminview: any = () => {
    this.router.navigate([`/admin/view/${Cookie.get('receiverId')}`])
  }
  public changePassword:any=()=>{
    if(!this.oldPass){
      this.toastr.warning("Enter Your Current Password")
    }
    
     else if(!this.newPass){
        this.toastr.warning("Enter Your New Password")

    }else if(!this.confPass){
      this.toastr.warning("Confirm your New Password")
    }else if(this.newPass!==this.confPass){
      this.toastr.warning("Password Does Not Match")
    }else{
    let data={
      oldPass:this.oldPass,
      newPass:this.newPass,
      userId:this.userId
    }
    this.appService.changePass(data).subscribe((apiResponse)=>{
      if(apiResponse){
        this.toastr.success("Password Changed Successfully...")
        if((Cookie.get('receiverIsAdmin'))=='true'){
          setTimeout(() => {
            this.goToAdminview();
          }, 2000);
        }else{
          setTimeout(() => {
            this.goToUserview();
          }, 2000);
        }
      }
    },
     
      (err)=>{
          this.toastr.warning("You Entered Wrong Password")
      }
    
    )
    }
  
}
  
  public goBack=()=>{
    if((Cookie.get('receiverIsAdmin'))=='true'){
      setTimeout(() => {
        this.goToAdminview();
      }, 2000);
    }else{
      setTimeout(() => {
        this.goToUserview();
      }, 2000);
    }
  }
}
