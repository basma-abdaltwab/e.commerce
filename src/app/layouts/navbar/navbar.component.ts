import { Component, computed, inject, OnInit, PLATFORM_ID, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  logged = computed(() => this.authService.isLogged());

  count: Signal<number> = computed(() => this.cartService.cartcount());

  wish: Signal<number> = computed(() => this.wishlistService.wishCount());

  isProfileMenuOpen = signal<boolean>(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.authService.isLogged.set(true);
        this.getCartNew();
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update((val) => !val);
  }

  logOut(): void {
    this.authService.signOut();
  }

  getCartNew(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartcount.set(res.numOfCartItems);
        }
      },
    });
  }

  handleSearch(term: string): void {
    if (term.trim() !== '') {
      // السطر ده وظيفته يغير الـ URL لـ /search ويضيف الكلمة كـ Query Parameter
      this.router.navigate(['/search'], {
        queryParams: { q: term },
      });
    }
  }
}
