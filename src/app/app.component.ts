import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiaovienService } from './services/giaovien.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DA5QLdayhoc';
  constructor(private router: Router, private giaovienService: GiaovienService) { }
  // logout() {
  //     this.giaovienService.logout();
  //     alert("Đã đăng xuất");
      
  //   setTimeout(() => {
  //     this.router.navigateByUrl('/main/home');
  //   }, 1000);
  //   location.reload();
 // }
}
