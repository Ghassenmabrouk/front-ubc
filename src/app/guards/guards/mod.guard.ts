import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserserviceService } from '../../userservice/userservice.service';

export const modGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserserviceService);
  const router = inject(Router);

  const user = userService.getUserInfo(); // Assuming getUserInfo retrieves the user info from local storage

  if (user && user.role === 'moderator') {
    return true; // Allow access if the user has the 'moderator' role
  } else {
    router.navigate(['/access-denied']); // Redirect to an access denied page if not authorized
    return false;
  }
};
