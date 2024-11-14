import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserserviceService } from '../../userservice/userservice.service';

export const adminmodGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserserviceService);
  const router = inject(Router);

  const user = userService.getUserInfo(); 

  if (user && (user.role === 'admin' || user.role === 'moderator')) {
    return true; 
  } else {
    router.navigate(['/access-denied']); 
    return false;
  }
};
