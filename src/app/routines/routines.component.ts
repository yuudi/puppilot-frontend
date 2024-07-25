import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { SailWatcherComponent } from '../sail-watcher/sail-watcher.component';
import { ApiGetRoutines, ApiGetSailsSailId } from '../types';
import { RoutinesService } from './routines.service';

@Component({
  selector: 'app-routines',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTooltipModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss',
})
export class RoutinesComponent implements OnInit {
  routines: Signal<ApiGetRoutines['routines']>;
  sails: Signal<Record<number, ApiGetSailsSailId | null>>;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private routinesService: RoutinesService,
  ) {
    this.routines = routinesService.routines;
    this.sails = routinesService.sails;
  }

  ngOnInit(): void {
    this.routinesService.fetchRoutines();
  }

  startRoutines(routines: string[]) {
    this.routinesService.startRoutines(routines).subscribe((data) => {
      this.snackBar.openFromComponent(SailWatcherComponent, {
        data,
      });
    });
  }

  refreshRoutines() {
    this.routinesService.updateRoutines();
  }

  deleteRoutine(id: string) {
    this.routinesService.deleteRoutine(id);
  }

  showInfo(routineId: string) {
    const routine = this.routines().find((r) => r.id === routineId);
    if (!routine) {
      throw Error('cannot find routine ' + routineId);
    }
    this.dialog.open(InfoDialogComponent, { data: routine });
  }
}
