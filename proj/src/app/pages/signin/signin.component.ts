import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
// import { AuthService } from '../auth.service';
import { DOCUMENT } from '@angular/common';
import 'firebase/functions';
import { __rest } from 'tslib';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}
  ngOnInit(): void {}

  loginWithRedirect() {
    this.auth.loginWithRedirect({
      appState: {
        target: "/homescreen/dashboard", // Your desired redirect URI
      },
    });
  }

  
  



  // user: firebase.User;

  // constructor(private auth: AngularFireAuth) {}

  // login(email: string, password: string) {
  //   this.auth.signInWithEmailAndPassword(email, password).then(
  //     (credential) => {
  //       this.user = credential.user;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // logout() {
  //   this.auth.signOut().then(() => {
  //     this.user = null;
  //   });
  // }



  // private unsubscribe = new Subject<void>();
  // openRegister = true;
  // openRecover = true;
  // submitted: boolean = false;
  // isSignedIn = false;
  // userRegister = {} as UserRegister;
  // userLogin = {} as UserLogin;
  // data = {} as User;

// ------- USER FORM
  // signinform = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  // })

  // registerform = this.fb.group({
  //   fname: ['', [Validators.required]],
  //   lname: ['', [Validators.required]],
  //   email: ['', [Validators.required, Validators.email,Validators.minLength(6)]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  //   checkbox: [false, [Validators.requiredTrue]],
  // // }, {validator: this.MustMatch('password', 'confirmPassword')
  // });

  // recoverPassword = this.fb.group({
  //   email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
  // })

  // constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private fireB: FirebaseService) { }

  // ngOnInit(): void {
  //   this.unsubscribe.next();
  //   this.unsubscribe.complete();
  // }

  // onSubmit(formGroup: FormGroup) {
  //   console.log('inside submit')
  //   if (formGroup.valid) {
  //     console.log(formGroup.value);
  //     this.authService.login(
  //       formGroup.value.email,
  //       formGroup.value.password
  //     );
  //   }
  // }

  // get f() {
  //   return this.registerform.controls;
  // }
  


//   MustMatch(controlName: string, matchingControlName: string) {return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];
//       if (matchingControl.errors && !matchingControl.errors['mustMatch']) {return;}
//         if (control.value !== matchingControl.value) {
//          matchingControl.setErrors({ mustMatch: true });
//         } else {matchingControl.setErrors(null);}
//   }}

//  // -------- FOR USER SIGNIN
//   async login(email: string, password: string) : Promise<void> {

//     if(this.signinform.valid){
//       this.userLogin.email = email;
//       this.userLogin.password = password;
//       (await this.fireB.signInUser(this.userLogin)).pipe(takeUntil(this.unsubscribe)).subscribe(async (result) => {
//         console.log(result);
//         if(result.data == null){
//           this.router.navigate(['/signin']);
//           alert("Invalid Email or Password. Try Again.")}
//         else if(result.data !== null){
//           if (result.data.email === "admin@gotabang.com"){
//           this.router.navigate(['/adminView/dashboard']);
//           }
//           else
//             this.router.navigate(['/homescreen/dashboard']);
//         }

//         this.isSignedIn = result!.success;
//         if(this.isSignedIn){

//           (await this.fireB.logUser(result.data!.id)).subscribe((user)=>{
//             //console.log(this.fireB.currentUser);
//             this.fireB.updateUser(user!)

//           });
//         }
//       })
//     this.authService.isLoggedIn!;
//     }else {
//       alert("Invalid credentials");
//     }
//   }

//   clickToLogin() : void {
//     this.openRegister = true;
//     this.openRecover = true;
//   }

//   // -------- FOR USER REGISTRATION
//   clickToRegister() : void {
//     this.openRegister = false;
//   }

//   async register(fname: string, lname: string, email:string, password:string) : Promise<void> {
//     if(this.registerform.valid){
//     this.userRegister.email = email;
//     this.userRegister.password = password;
//     this.userRegister.fname = fname;
//     this.userRegister.lname = lname;


//     var output = await this.fireB.registerUser(this.userRegister);
//     console.log(output);

//     this.isSignedIn = output.success;
//     this.authService.isLoggedIn!;
//     alert("Successfully Registered");
//     this.openRegister = true;
//     this.openRecover = true;
//     }else {
//       alert("Invalid credentials");
//     }
//   }

//   // -------- FOR USER RECOVERY
//   recover() : void {
//     if(this.recoverPassword.valid){
//       this.openRecover = true;
//     }else {
//       alert("Invalid credentials");
//     }
//   }

//   clickToRecover() : void {
//     this.openRecover = false;
//   }

}
