import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'occupation', 'actions'];
  dataSource: User[] = [];
  selectedUser: User | null = null;
  updateUserForm: FormGroup; 
  router: any;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: ['']
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

  showDetails(user: User) {
    this.selectedUser = user;
    this.updateUserForm.patchValue({
      name: user.name,
      email: user.email,
      occupation: user.occupation
    });
  }
  showUpdateUserForm(user: User) {
    this.router.navigate(['/update-user', user.id]);
  }

  showAddUserForm() {
    this.router.navigate(['/add-user']);
  }

  updateUser(user: User) {
    const updatedUser: User = {
      id: user.id,
      name: this.updateUserForm.value.name,
      email: this.updateUserForm.value.email,
      occupation: this.updateUserForm.value.occupation,
      bio: ''
    };
    
    this.userService.updateUser(updatedUser).subscribe((response: User) => {
      console.log('Utilisateur mis à jour avec succès :', response);
    });
  }

  deleteUser(user: User) {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');

    if (confirmDelete) {
      this.userService.deleteUser(user.id.toString()).subscribe(() => {
        this.dataSource = this.dataSource.filter(u => u !== user);
      });
    }
  }
  addUser() {
  
    const newUser: User = {
      id: 0, 
      name: this.updateUserForm.value.name,
      email: this.updateUserForm.value.email,
      occupation: this.updateUserForm.value.occupation,
      bio: ''
    };

    this.userService.addUser(newUser).subscribe((addedUser: User) => {
      this.dataSource.push(addedUser);
      this.updateUserForm.reset();
      this.selectedUser = null;
      console.log('Utilisateur ajouté avec succès :', addedUser);
    });
  }
}
