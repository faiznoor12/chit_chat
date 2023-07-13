import { Injectable } from '@angular/core';
import { Auth, UserInfo, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  $currentUser = authState(this.auth)

  constructor(private auth:Auth) { }

  signUp(email:any, password:string){
     return from(
      createUserWithEmailAndPassword(this.auth, email , password)
     )
  }

  login(username:string , password:string){
   return from(signInWithEmailAndPassword(this.auth , username,password ))
  }

  logout(){0
    return from(this.auth.signOut())
  }

  updateProfileData(profileData:Partial<UserInfo>):Observable<any>{
     const user = this.auth.currentUser
     return of(user).pipe(
      concatMap(user => {
        if(!user) throw new Error('Not authenticated')
        return updateProfile(user,profileData)
      })
     )
  }

}
