import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DA5QLdayhoc';
  constructor(private router: Router) { }
  // logout() {
  //     this.giaovienService.logout();
  //     alert("Đã đăng xuất");
      
  //   setTimeout(() => {
  //     this.router.navigateByUrl('/main/home');
  //   }, 1000);
  //   location.reload();
 // }
}
