import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User = new User();
  updateUserForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: ['']
    });
  
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe((user: User) => {
        this.user = user;
        this.updateUserForm.patchValue({
          name: user.name,
          email: user.email,
          occupation: user.occupation
        });
      });
    }
  }
  

  initializeForm() {
    this.updateUserForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      occupation: [this.user.occupation]
    });
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      const updatedUser: User = {
        id: this.user.id,
        name: this.updateUserForm.value.name,
        email: this.updateUserForm.value.email,
        occupation: this.updateUserForm.value.occupation,
        bio: ''
      };

      this.userService.updateUser(updatedUser).subscribe(() => {
        this.router.navigate(['/users']); 
      });
    }
  }
}
