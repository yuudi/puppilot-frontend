import { Component, computed, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { exhaustMap, interval, of, tap } from 'rxjs';
import { RoutinesService } from '../routines/routines.service';

@Component({
  selector: 'app-sail-watcher',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './sail-watcher.component.html',
  styleUrl: './sail-watcher.component.scss',
})
export class SailWatcherComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef);

  sailStatus = computed(() => {
    return this.routinesService.sails()[this.data.sailId];
  });
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { sailId: string },
    private routinesService: RoutinesService,
  ) {}

  ngOnInit(): void {
    this.refreshSail();
  }

  refreshSail() {
    const subscription = interval(1000)
      .pipe(
        exhaustMap(() =>
          document.visibilityState === 'visible'
            ? this.routinesService.fetchSail(this.data.sailId).pipe(
                tap((status) => {
                  if (status.status === 'completed') {
                    subscription.unsubscribe();
                  }
                }),
              )
            : of(null),
        ),
      )
      .subscribe();
  }
}
