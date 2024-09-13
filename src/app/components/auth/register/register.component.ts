import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../services/user.service'; // Import User type

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const userData: User = this.registerForm.value;

    this.userService.register(userData).pipe(
      catchError(error => {
        this.errorMessage = 'Registration failed. Please try again.';
        return of(null); // Return null on error
      })
    ).subscribe(response => {
      if (response) {
        this.router.navigate(['/login']); // Redirect to login or another route
      } else {
        // Handle the case where registration failed
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
