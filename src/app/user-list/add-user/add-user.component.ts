import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  addUser(): void {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
