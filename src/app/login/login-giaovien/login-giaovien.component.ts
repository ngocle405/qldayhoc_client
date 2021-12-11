import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { TranggiaovienService } from 'src/app/services/tranggiaovien.service';
import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-login-giaovien',
  templateUrl: './login-giaovien.component.html',
  styleUrls: ['./login-giaovien.component.css'],
  providers: [MessageService]
})
export class LoginGiaovienComponent implements OnInit {
  formLogin !: FormGroup ;
  constructor(    private fb: FormBuilder,
    private readonly messageService: MessageService,
    private tranggiaovienService:TranggiaovienService,
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

    this.tranggiaovienService
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
              this.router.navigateByUrl('/giaovien/dashboard');
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
