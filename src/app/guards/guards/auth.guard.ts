import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserserviceService } from '../../userservice/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserserviceService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.userService.getUserRole();
    if (userRole) { 
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
