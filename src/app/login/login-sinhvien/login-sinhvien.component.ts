import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-login-sinhvien',
  templateUrl: './login-sinhvien.component.html',
  styleUrls: ['./login-sinhvien.component.css']
})
export class LoginSinhvienComponent implements OnInit {
  formLogin !: FormGroup ;
  constructor(    private fb: FormBuilder,
    private sinhvienService: SinhvienService,
    private router: Router) { }

  ngOnInit(): void {
  
    this.formLogin = this.fb.group({
      masv: this.fb.control('', [Validators.required]),
      matkhau: this.fb.control('', [
        Validators.required,
         Validators.minLength(6),
      ]),
    });
   
  }
  onLogin() {
    var gvLogin = {
      masv : this.formLogin.get('masv')?.value ,
      matkhau: this.formLogin.get('matkhau') ?.value 
    };

    this.sinhvienService
      .login(gvLogin)
    
      .subscribe(
        (gv) => {
          if (gv == null) {
            alert("tài khoản hoặc mật khẩu chưa đúng")
            this.clearFormLogin();
            
          } else if(gv!="") {
            
            alert("welcome to student");
            setTimeout(() => {
              this.router.navigateByUrl('/sinhvien/dashboard');
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
