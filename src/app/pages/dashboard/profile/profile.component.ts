import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile';
import { User } from 'src/app/interfaces/user';
import { DateTimeService } from 'src/app/services/date-time.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    bmr: 2212,
    protein: 600,
    fat: 600,
    carb: 700,
    callories: 2300,
    date: Date.now(),
    meals: [
      {
        name: 'pizza', protein: 12, fat: 36, carb: 250, ccal: 854
      },
      {
        name: 'Potato', protein: 4, fat: 4, carb: 452, ccal: 650
      },
      {
        name: 'Italia', protein: 4, fat: 4, carb: 452, ccal: 650
      },
      {
        name: 'Tuna', protein: 4, fat: 4, carb: 452, ccal: 650
      }
    ]
  }

  profileDate: Observable<any> = new Observable()


  constructor(private profileService: ProfileService, private dateTime: DateTimeService) {
  }

  ngOnInit(): void {
    this.profileService.addProfile(this.profile)

    this.dateTime.getToday().subscribe(d => {
      let date = new Date(d).setHours(0, 0, 0, 0)
      this.profileDate = this.profileService.getProfile(date)

    })

  }


}
