import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserserviceService } from '../../userservice/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class VipGuard implements CanActivate {

  constructor(private userService: UserserviceService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUserInfo(); 
    if (user && user.vipAccess) { 
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
