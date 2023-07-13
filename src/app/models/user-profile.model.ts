export interface ProfileUser {
  uid:string;
  email?:string | null | undefined;
  displayName?:string | null | undefined;
  photoURL?:string;
  firstName?:string;
  lastName?:string;
  phone?:string;
  address?:string;
}
