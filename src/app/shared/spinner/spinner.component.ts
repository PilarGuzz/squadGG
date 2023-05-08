import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/_services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
  <div class="lds-ring">
    <div></div><div></div><div></div><div></div>
  </div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$ = this.spinnerSvc.isLoading$;

  constructor(private readonly spinnerSvc: SpinnerService  ) { }

 

}
