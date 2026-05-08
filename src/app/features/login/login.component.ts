import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly toastrService = inject(ToastrService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createFormInit();
  }

  createFormInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            // Move To SaveToken

            this.toastrService.success(' Login Successful');

            localStorage.setItem('freshToken', res.token);

            localStorage.setItem('freshUser', JSON.stringify(res.user));

            this.authService.decodeUserToken()

            this.authService.isLogged.set(true);

            // navigate to Login

            this.router.navigate(['/home']);
          }
        },
      });
    }
  }
}
