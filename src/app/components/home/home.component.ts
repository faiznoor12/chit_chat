import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  search = false;
  searchControl = new FormControl('');
  $user = this.userService.currentUserProfile$;

  allUsers$ = combineLatest([
    this.userService.allUsers$,
    this.$user,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, user, searchString]) =>
      users.filter(
        (u) =>
          u.displayName?.toLowerCase().includes(searchString!.toLowerCase()) &&
          u.uid !== user?.uid
      )
    )
  );
  seachToggle(input: HTMLInputElement) {
    this.search ? input.blur() : input.focus();
    if (this.search) input.value = '';
    this.search = !this.search;
  }

  chats = [
    {
      name: 'blaa',
      date: '7/8/2023',
      lastmsg: 'This is the last message',
    },
    {
      name: 'blaa1',
      date: '7/8/2023',
      lastmsg: 'This is the last message',
    },
    {
      name: 'blaa2',
      date: '7/8/2023',
      lastmsg: 'This is the last message',
    },
    {
      name: 'blaa3',
      date: '7/8/2023',
      lastmsg: 'This is the last message',
    },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UsersService
  ) {}

  logout() {
    this.authService.logout().subscribe(() => this.router.navigateByUrl(''));
  }
  createChat(otherUser:ProfileUser) {

  }
}
