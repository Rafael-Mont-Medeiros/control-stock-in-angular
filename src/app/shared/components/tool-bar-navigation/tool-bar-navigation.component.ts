import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tool-bar-navigation',
  templateUrl: './tool-bar-navigation.component.html',
  styleUrls: []
})
export class ToolBarNavigationComponent {
  constructor(private router: Router, private cookie: CookieService){}

  logout():void{
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }
}
