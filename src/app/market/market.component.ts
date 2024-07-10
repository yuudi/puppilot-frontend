import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-market',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MarketComponent {}
