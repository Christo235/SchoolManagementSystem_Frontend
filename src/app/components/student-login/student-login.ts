import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../services/student';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './student-login.html',
  styleUrls: ['./student-login.css']
})
export class StudentLogin {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: Student, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) return;

    const credentials = {
      username: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password.trim()
    };

    this.studentService.login(credentials).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        sessionStorage.setItem('studentId', res.studentId);
        sessionStorage.setItem('studentName', res.studentName || credentials.username);
        this.router.navigate(['/students']);
      },
      error: (err: any) => {
        console.error('Login Error:', err);
        alert(err.error?.message || 'Invalid Credentials');
      }
    });
  }
}
