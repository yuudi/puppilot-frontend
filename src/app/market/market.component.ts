import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoutinesService } from '../routines/routines.service';
import { ApiGetMarketRoutines, ApiGetRoutines } from '../types';
import { MarketService } from './market.service';
import { SemverPipe } from './semver.pipe';

@Component({
  selector: 'app-market',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    SemverPipe,
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent {
  localRoutines: Signal<ApiGetRoutines['routines']>;
  marketRoutines: Signal<ApiGetMarketRoutines['routines']>;
  routines = computed(() => {
    const localRoutines = this.localRoutines();
    const marketRoutines = this.marketRoutines();
    return marketRoutines.map((r) => {
      return {
        ...r,
        downloaded: localRoutines.find((mr) => mr.id === r.id),
      };
    });
  });
  constructor(
    private marketService: MarketService,
    private routinesService: RoutinesService,
  ) {
    this.localRoutines = routinesService.routines;
    this.marketRoutines = marketService.routines;
    routinesService.fetchRoutines();
    marketService.fetchRoutines();
  }

  refreshRoutines() {
    this.marketService.updateRoutines();
  }

  downloadRoutine(routineId: string) {
    this.marketService.downloadRoutine(routineId).subscribe(() => {
      this.routinesService.updateRoutines();
    });
  }
}
