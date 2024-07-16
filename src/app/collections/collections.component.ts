import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RoutinesService } from '../routines/routines.service';
import { SailWatcherComponent } from '../sail-watcher/sail-watcher.component';
import { ApiGetRoutines } from '../types';
import { CollectionsService } from './collections.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit {
  collections: Signal<Record<string, string[]>>;
  collectionNames: Signal<string[]>;
  activeCollection: WritableSignal<string | null>;
  routines: Signal<ApiGetRoutines['routines']>;
  routineSelection = viewChild<MatSelectionList>('routineSelection');
  routineSelected: Signal<string[]>;

  constructor(
    private snackBar: MatSnackBar,
    private collectionsService: CollectionsService,
    private routinesService: RoutinesService,
  ) {
    this.collections = collectionsService.collections;
    this.collectionNames = computed(() => Object.keys(this.collections()));
    const first = Object.keys(this.collections()).at(0) ?? null;
    this.activeCollection = signal<string | null>(first);
    this.routines = routinesService.routines;
    this.routineSelected = computed(() => {
      const activeCollection = this.activeCollection();
      if (!activeCollection) return [];
      return this.collections()[activeCollection] ?? [];
    });
    effect(() => {
      const options = this.routineSelection()?.options;
      if (!options) {
        return;
      }
      const routineSelected = this.routineSelected();
      for (const option of options) {
        option.selected = routineSelected.includes(option.value);
      }
    });
  }

  ngOnInit(): void {
    this.routinesService.fetchRoutines();
  }

  selectionChanged(newSelection: string[]) {
    const activeCollection = this.activeCollection();
    if (!activeCollection) {
      throw new Error('activeCollection is null in selectionChanged');
    }
    this.collectionsService.putToCollection(activeCollection, newSelection);
  }

  addCollection() {
    const name = prompt('Enter collection name'); // TODO: use a dialog
    if (!name) return;
    this.collectionsService.addCollection(name);
  }

  startRoutines(routines: string[]) {
    this.routinesService.startRoutines(routines).subscribe((data) => {
      this.snackBar.openFromComponent(SailWatcherComponent, {
        data,
      });
    });
  }
}
