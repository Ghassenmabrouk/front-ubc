import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserserviceService } from '../../userservice/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cartservices/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  isVip: boolean = false;
  isCartOpen: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private userService: UserserviceService,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private http: HttpClient,
    public cartService: CartService
  ) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    if (browserLang) {
      this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      this.translate.use('en');
    }

    // Listen for login events
    this.userService.userLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.checkUserStatus();
      }
    });
  }

  ngOnInit(): void {
    this.cartService.loadCartItems(); // Load the items from localStorage
    this.checkUserStatus();

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  checkUserStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        this.userName = parsedUserInfo.username || parsedUserInfo.name;
        this.isVip = parsedUserInfo.vipAccess; // Check if the user is VIP
        this.cdr.detectChanges();
      } else {
        this.userName = null;
        this.isVip = false;
        this.cdr.detectChanges();
      }
    }
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.translate.use(target.value);
    }
  }

  logout() {
    // Call backend to handle logout on the server side (optional but recommended)
    this.http.post('http://localhost:3100/logout/logout', {}).subscribe(response => {
        console.log('Logged out from the server', response);
        this.cookieService.deleteAll('/', 'http://localhost:3100');
        // Clear local storage
        this.userService.clearUserInfo();

        console.log('Logging out...');
        this.userName = null;  // Reset userName
        this.router.navigate(['/login']);
        this.cdr.detectChanges();  // Trigger change detection manually
    }, error => {
        console.error('Error during logout:', error);
    });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
