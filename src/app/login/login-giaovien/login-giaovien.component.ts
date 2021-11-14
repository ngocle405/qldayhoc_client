import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiaovienService } from 'src/app/services/giaovien.service';

@Component({
  selector: 'app-login-giaovien',
  templateUrl: './login-giaovien.component.html',
  styleUrls: ['./login-giaovien.component.css']
})
export class LoginGiaovienComponent implements OnInit {
  formLogin !: FormGroup ;
  constructor(    private fb: FormBuilder,
    private giaovienService: GiaovienService,
    private router: Router) { }

  ngOnInit(): void {
  
    this.formLogin = this.fb.group({
      magv: this.fb.control('', [Validators.required]),
      matkhau: this.fb.control('', [
        Validators.required,
         Validators.minLength(6),
      ]),
    });
   
  }
  onLogin() {
    var gvLogin = {
      magv : this.formLogin.get('magv')?.value ,
      matkhau: this.formLogin.get('matkhau') ?.value 
    };

    this.giaovienService
      .login(gvLogin)
    
      .subscribe(
        (gv) => {
          if (gv == null) {
            alert("tk mk k ton tai")
            this.clearFormLogin();
            
          } else if(gv!="") {
            
            alert("welcome to teacher");
            setTimeout(() => {
              this.router.navigateByUrl('/giaovien/dashboard');
            }, 1000);
          }
          console.log(gv);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  clearFormLogin() {
    this.formLogin.reset();
  }
}
