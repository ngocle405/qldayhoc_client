import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-login-sinhvien',
  templateUrl: './login-sinhvien.component.html',
  styleUrls: ['./login-sinhvien.component.css'],
  providers: [MessageService]
})
export class LoginSinhvienComponent implements OnInit {
  formLogin !: FormGroup ;
  constructor(    private fb: FormBuilder,
    private readonly messageService: MessageService,
    private trangsinhvienService: TrangsinhvienService,
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

    this.trangsinhvienService
      .login(gvLogin)
    
      .subscribe(
        (gv) => {
          if (gv == null) {
            this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Tài khoản hoặc mật khẩu chưa đúng.' });
            setTimeout(() => {
              this.clearFormLogin();
            }, 2000);
            
          } else if(gv!="") {
            
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã đăng nhập thành công.' });
            setTimeout(() => {
              this.router.navigateByUrl('/sinhvien/dashboard');
            }, 2000);
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
