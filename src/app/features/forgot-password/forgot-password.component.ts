import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: WritableSignal<number> = signal<number>(1);

  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  resetCodeControl: FormControl = new FormControl('', [Validators.required]);

  newPasswordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);

  submitEmail(e: SubmitEvent): void {
    e.preventDefault();

    if (this.emailControl.valid) {
      const data = {
        email: this.emailControl.value,
      };

      this.authService.forgotPassword(data).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            console.log(res);
            this.step.set(2);
          }
        },
      });
    }
  }

  submitResetCode(e: SubmitEvent): void {
    e.preventDefault();

    const data = {
      resetCode: this.resetCodeControl.value,
    };

    this.authService.verifyResetCode(data).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          console.log(res);
          this.step.set(3);
        }
      },
    });
  }

  submitNewPassword(e: SubmitEvent): void {
    e.preventDefault();

    const data = {
      email: this.emailControl.value,
      newPassword: this.newPasswordControl.value,
    };

    this.authService.resetPassword(data).subscribe({
      next: (res) => {
      this.router.navigate(['/login'])
      },
    });
  }
}
