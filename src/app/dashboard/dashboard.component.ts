import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'ECP Allocation for existing homes', cols: 1, rows: 1 },
          { title: 'ECP Allocation for new homes', cols: 2, rows: 1 },
          { title: 'Envoirmental Data', cols: 3, rows: 1 },
        ];
      }

      return [
        { title: 'ECP Allocation for existing homes', cols: 1, rows: 1 },
        { title: 'ECP Allocation for new homes', cols: 2, rows: 1 },
        { title: 'Envoirmental Data', cols: 3, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
