import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student } from '../../services/student';

@Component({
  selector: 'app-student-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './student-register.html',
  styleUrls: ['./student-register.css']
})
export class StudentRegisterComponent implements OnInit {
  registerForm: FormGroup;
  studentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: Student,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      qualifications: this.fb.array([this.createQualification()])
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    if (this.studentId) {
      this.loadStudent(this.studentId);
    }
  }

  createQualification(): FormGroup {
    return this.fb.group({
      courseName: [''],
      university: [''],
      yearOfPassing: [''],
      percentage: ['']
    });
  }

  get qualifications(): FormArray {
    return this.registerForm.get('qualifications') as FormArray;
  }

  addQualification() {
    this.qualifications.push(this.createQualification());
  }

  removeQualification(index: number) {
    this.qualifications.removeAt(index);
  }


  loadStudent(id: number) {
    this.studentService.getStudentById(id).subscribe({
      next: (res: any) => {
        this.registerForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          age: res.age,
          dob: res.dob,
          gender: res.gender,
          email: res.email,
          phoneNumber: res.phoneNumber,
          username: res.username,
          password: res.password
        });


        this.registerForm.setControl(
          'qualifications',
          this.fb.array(res.qualifications.map((q: any) => this.fb.group(q)))
        );
      },
      error: (err: any) => console.error(err)
    });
  }

  submit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const studentData = this.registerForm.value;

    if (this.studentId) {

      this.studentService.updateStudent(this.studentId, studentData).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.router.navigate(['/students']);
        },
        error: (err: any) => console.error(err)
      });
    } 
    else {

      this.studentService.register(studentData).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.registerForm.reset();
          this.registerForm.setControl('qualifications', this.fb.array([this.createQualification()]));
          this.router.navigate(['/login']);
        },
        error: (err: any) => console.error(err)
      });
    }
  }

}
