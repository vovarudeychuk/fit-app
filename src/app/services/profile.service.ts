import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { DateTimeService } from './date-time.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: Firestore, private auth: NbAuthService, private dateTime: DateTimeService) {
  }

 getProfile(date: number): Observable<any>  {
   const userRef = doc(this.firestore, `profile/${this.getAuthUid()}/calendar/${date.toString()}`);
   return docData(userRef, { idField: 'id' }) as Observable<any>;
 }

 async addProfile(profile: Profile) {
  let date = new Date()
  // d.setDate(d.getDate() - 1)
  let nextDay = date.setDate(date.getDate())
  await setDoc(doc(this.firestore, `profile/${this.getAuthUid()}/calendar`, new Date(nextDay).setHours(0, 0, 0, 0).toString()), profile)
 }

 private getAuthUid(): string {
  let uId: string = ''
  this.auth.onTokenChange().subscribe((token) => {
    if(token.isValid()) {
      uId = token.getPayload().user_id
    }
    
  })
  return uId
}
}
