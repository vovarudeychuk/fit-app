import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile';
import { NutritionsService } from 'src/app/services/nutritions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html',
  styleUrls: ['./nutritions.component.scss']
})
export class NutritionsComponent implements OnInit {
  @Input() profileData: any;
    
  public user: any;
  value = 70;
  constructor(private userService: UserService, private nutService: NutritionsService) { }

  ngOnInit(): void {
    // this.userService.getUser().subscribe( user => {
    //   this.user = user
    // })
  }

  protein(bmr: any, percent: number) {
    return this.nutService.getProtein(bmr, percent)
  }

  fat(bmr: any, percent: number) {
    return this.nutService.getFat(bmr, percent)
  }

  carb(bmr: any, percent: number) {
    return this.nutService.getCarb(bmr, percent)
  }

  ccal(bmr: any, percent: number) {
    return this.nutService.getCcal(bmr, percent)
  }

  getPercentProm(num: number, tall: number) {
    return this.normalizeNumber(num / 100 * tall)
  }

  normalizeNumber(num: number) {
    return Math.floor(num)
  }
}
