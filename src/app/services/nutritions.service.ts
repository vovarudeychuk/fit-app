import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NutritionsService {
  private ratio = {p: 3, f: 2, c: 5}
  // private bmr: number = 0;
  constructor() { }


  getProtein(bmr: any, percentValue: any): number {
    return Math.floor(this.getPercentProm(bmr/this.ratio.p, percentValue) / 4)
  }

  getFat(bmr: any, percentValue: any): number {
    return Math.floor(this.getPercentProm(bmr/this.ratio.f, percentValue) / 9)
  }

  getCarb(bmr: any, percentValue: any): number {
    return Math.floor(this.getPercentProm(bmr/this.ratio.c, percentValue) / 4)
  }

  getCcal(bmr: any, percentValue: any): number {
    return Math.floor(this.getPercentProm(bmr, percentValue))
  }

  getPercentProm(num: number, tall: number) {
    return this.normalizeNumber(num / 100 * tall)
  }

  normalizeNumber(num: number) {
    return Math.floor(num)
  }
}
