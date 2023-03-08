import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.interface';

@Component({
  selector: 'app-data-profile',
  templateUrl: './data-profile.component.html',
  styles: [
  ]
})
export class DataProfileComponent implements OnInit {
  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
