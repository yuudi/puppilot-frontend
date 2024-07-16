import { Component, computed, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { exhaustMap, interval, tap } from 'rxjs';
import { RoutinesService } from '../routines/routines.service';

@Component({
  selector: 'app-sail-watcher',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sail-watcher.component.html',
  styleUrl: './sail-watcher.component.scss',
})
export class SailWatcherComponent implements OnInit {
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
          this.routinesService.fetchSail(this.data.sailId).pipe(
            tap((status) => {
              if (status.status === 'completed') {
                subscription.unsubscribe();
              }
            }),
          ),
        ),
      )
      .subscribe();
  }
}
