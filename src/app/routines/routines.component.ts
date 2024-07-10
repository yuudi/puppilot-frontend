import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiGetRoutines, ApiGetSailsSailId } from '../types';
import { RoutinesService } from './routines.service';

@Component({
  selector: 'app-routines',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss',
})
export class RoutinesComponent implements OnInit {
  routines!: Signal<ApiGetRoutines['routines']>;
  sails!: Signal<Record<number, ApiGetSailsSailId | null>>;
  constructor(private routinesService: RoutinesService) {
    this.routines = routinesService.routines;
    this.sails = routinesService.sails;
  }

  ngOnInit(): void {
    this.routinesService.fetchRoutines();
  }

  startRoutines(routines: string[]) {
    this.routinesService.startRoutines(routines).subscribe(() => {
      void 0;
    });
  }

  refreshRoutines() {
    this.routinesService.updateRoutines();
  }
}
