import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.interface';

@Component({
  selector: 'app-principalprofile',
  templateUrl: './principalprofile.component.html',
  styles: [
  ]
})
export class PrincipalprofileComponent implements OnInit {
  @Input() user!: User;
  

  constructor() { }

  ngOnInit(): void {
  }

}
