import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Bus-Ticket';
  login:boolean =true
  allUsers:any[]=[]
  result :any
  dataUser:any
  loginData:any
  registerDetails:any
    regesterForm:FormGroup =new FormGroup({
      userName:new FormControl("",[Validators.required]),
        emailId:new FormControl("",[Validators.email,Validators.required]),
        fullName:new FormControl("",[Validators.required,Validators.pattern('[A-Za-z]{6,}')]),
        password:new FormControl("",[Validators.required])

    })

   loginForm:FormGroup =new FormGroup({

        emailId:new FormControl("",[Validators.email,Validators.required]),
        password:new FormControl("",[Validators.required])

    })



  constructor(private masterServ:MasterService){
    }

ngOnInit(): void {
  this.getAllUsers()

}
  openModel(){
   const model = document.getElementById('myModal')
   if(model != null){
    model.style.display='block'
   }
  }
  closeModel(){
  const model = document.getElementById('myModal')
   if(model != null){
    model.style.display='none'

  }
}
getAllUsers(){
  this.masterServ.getAllUsers().subscribe((res:any)=>{
    this.allUsers=res.data
    console.log(this.allUsers)


  })
}
 register(){


   const model = {
  userId: 0,
  userName:this.regesterForm.value.userName,
  emailId: this.regesterForm.value.emailId,
  fullName:this.regesterForm.value.fullName,
  role: "",
  createdDate: new Date(),
  password: this.regesterForm.value.password,
  projectName: "",
  refreshToken: "",
 refreshTokenExpiryTime: new Date()
}
let index = this.allUsers.findIndex((item:any)=>item.emailId == this.regesterForm.value.emailId )


if(index !=  -1){
  alert ('this email already exist')
}else{
  this.masterServ.postNewUser(model).subscribe((res:any)=>{
    this.dataUser = res.data
    alert ('user register success')
    localStorage.setItem("userRegister",JSON.stringify(this.dataUser))
    this.closeModel()
  })
}

}



 loggOff(){
  this.dataUser = undefined
  localStorage.removeItem('userRegister')

}
signIn(){
  let index = this.allUsers.findIndex(item => item.emailId == this.loginForm.value.emailId && item.password == this.loginForm.value.password)

  if(index == -1){
    alert('Email or Password is wrong')
  }else{
    const model = {

      userName: this.allUsers[index].userName,
      password: this.loginForm.value.password
    }
    this.masterServ.postUserLogin(model).subscribe((res:any)=>{
      this.loginData = res
      console.log(this.loginData)
      alert ('login success')
      this.closeModel()
    })
  }
};


}










