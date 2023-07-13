import { Component } from '@angular/core';
import { User, user, updateProfile } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileUser } from 'src/app/models/user-profile.model';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  $user = this.userService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private authService: AuthenticationService,
    private imageUpload: ImageUploadService,
    private toaster: HotToastService,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.$user
      .pipe(untilDestroyed(this))
      .subscribe((user) => this.profileForm.patchValue({ ...user }));
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUpload
      .uploadImage(event.target.files[0], `image/profile/${user.uid}`)
      .pipe(
        this.toaster.observe({
          loading: 'Image is being uploaded...',
          success: 'Image uploaded',
          error: 'There was an error uploading',
        }),
        concatMap((photoURL) =>
          this.userService.updateUser({uid:user.uid , photoURL })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const profileData = this.profileForm.value
    this.userService.updateUser(profileData).pipe(
      this.toaster.observe({
        loading:'Updating data...',
        success:'Data saved successfully',
        error:'there was an error'
      })
    ).subscribe()
  }
}
