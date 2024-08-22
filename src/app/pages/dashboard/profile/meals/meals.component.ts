import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  @Input() mealsData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
