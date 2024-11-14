import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  tempPassword?: string;
  emailConfirmed?: boolean;
  isBanned?: boolean;
  photo?: string;
  vipAccess?: boolean;  
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  editingEmail: string | null = null;
  adminCount: number = 0;
  technicienCount: number = 0;
  userCount: number = 0;
  searchTerm: string = '';
  private searchTimeout: any;

  constructor(
    private userService: UserserviceService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.filterUsers();
    }, 300); // 300ms delay
  }

  filterUsers() {
    if (this.searchTerm.trim()) {
      this.userService.getUsers().subscribe(
        (data: User[]) => {
          this.users = data.filter(user => 
            user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.phoneNumber.includes(this.searchTerm) ||
            user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        },
        (error) => {
          console.error('Error filtering users:', error);
        }
      );
    } else {
      this.getUsers(); // If search term is empty, fetch all users
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.countUsersByRole(); // Update counts after fetching users
      },
      (error) => {
        console.error(error);
      }
    );
  }

  countUsersByRole() {
    this.adminCount = this.users.filter(user => user.role === 'admin').length;
    this.technicienCount = this.users.filter(user => user.role === 'moderator').length;
    this.userCount = this.users.filter(user => user.role === 'user').length;
  }

  enableEditing(user: User) {
    this.editingEmail = user.email;
  }

  saveChanges(user: User) {
    this.userService.updateUserByEmail(user.email, user).subscribe(
      (updatedUser) => {
        this.editingEmail = null;
        this.showSuccessSnackbar('User updated successfully.');
        this.getUsers(); // Refresh the list after updating the user
      },
      (error) => {
        console.error('Error updating user:', error);
        this.showSuccessSnackbar('Error updating user.');
      }
    );
  }

  cancelEditing() {
    this.editingEmail = null;
    this.getUsers();
  }

  banUserByEmail(email: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will ban the user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ban it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.banUserByEmail(email).subscribe({
          next: (response) => {
            console.log('Response from server:', response);
            if (response.ok) {
              console.log('User banned successfully');
              this.showSuccessSnackbar('User banned successfully.');
              this.getUsers();
            } else {
              console.error('Unexpected response structure:', response);
              this.showSuccessSnackbar('Error banning user. Refresh the page, please.');
            }
          },
          error: (error) => {
            console.error('Error banning user:', error);
            this.showSuccessSnackbar('Error banning user. Refresh the page, please.');
          },
        });
      }
    });
  }

  unbanUserByEmail(email: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will unban the user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unban it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.unbanUserByEmail(email).subscribe({
          next: (response) => {
            this.showSuccessSnackbar('User unbanned successfully.');
            this.getUsers();
          },
          error: (error) => {
            console.error('Error unbanning user:', error);
            this.showSuccessSnackbar('Error unbanning user. Refresh the page, please.');
          },
        });
      }
    });
  }

  deleteUser(email: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(email).subscribe({
          next: () => {
            this.showSuccessSnackbar('User deleted successfully.');
            this.getUsers(); // Refresh the list after deleting the user
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.showSuccessSnackbar('Error deleting user.');
          },
        });
      }
    });
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['green-snackbar'],
    });
  }
}
