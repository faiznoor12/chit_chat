import { Injectable } from '@angular/core';
import { Firestore, Query, collection, collectionData, doc, docData, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile.model';
import { Observable, from, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$():Observable<ProfileUser | null>{
    return this.authservice.$currentUser.pipe(switchMap((user)=>{
      if (!user?.uid) return of(null)
      const ref = doc(this.fireStore ,'users',user?.uid)
      return docData(ref) as Observable<ProfileUser>
    }))
  }

  constructor(private fireStore: Firestore, private authservice:AuthenticationService )  { }

  addUser(user:ProfileUser):Observable<any>{
    const ref = doc(this.fireStore,'users',user?.uid)
    return from(setDoc(ref , user))
  }
   updateUser(user:any):Observable<any>{
    const ref = doc(this.fireStore,'users',user?.uid)
    return from(updateDoc(ref , {...user}))
  }

  get allUsers$():Observable<ProfileUser[]>{
    const ref = collection(this.fireStore,'users')
    const queryAll = query(ref)
    return collectionData(queryAll) as Observable<ProfileUser[]>
  }
}
