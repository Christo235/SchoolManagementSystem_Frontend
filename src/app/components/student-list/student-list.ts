import { Component, OnInit } from '@angular/core';
import { Student } from '../../services/student';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentList implements OnInit {
  students: any[] = [];

  constructor(private studentService: Student, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res: any) => this.students = res,
      error: (err) => console.error(err)
    });
  }

  editStudent(student: any) {
    this.router.navigate(['/edit-student', student.studentId]);
  }


  deleteStudent(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error(err)
      });
    }
  }
}
