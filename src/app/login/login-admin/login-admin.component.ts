import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminCPService } from 'src/app/services/admin-cp.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  providers: [MessageService]
})
export class LoginAdminComponent implements OnInit {

  formLogin !: FormGroup ;
  constructor(
    private fb: FormBuilder,
    private adminCPService: AdminCPService,
    private readonly messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
         Validators.minLength(1),
      ]),
    });
  }
  onLogin() {
    var adminLogin = {
      username : this.formLogin.get('username')?.value ,
      password: this.formLogin.get('password') ?.value 
    };

    this.adminCPService
      .login(adminLogin)
    
      .subscribe(
        (admin) => {
          if (admin == null) {
            this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Tài khoản hoặc mật khẩu chưa đúng.' });
           
            setTimeout(() => {
              this.clearFormLogin();
            }, 2000);
            
          } else if(admin!="") {
            
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã đăng nhập thành công.' });
            setTimeout(() => {
              this.router.navigateByUrl('/admin/home');
            }, 2000);
          }
          console.log(admin);
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
