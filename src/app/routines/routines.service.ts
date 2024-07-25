import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ApiGetRoutines, ApiGetSailsSailId, ApiPostSails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  #routineFetched = false;
  #routines = signal<ApiGetRoutines['routines']>([]);
  #sails = signal<Record<string, ApiGetSailsSailId | null>>({});
  constructor(private http: HttpClient) {}

  get routines(): Signal<ApiGetRoutines['routines']> {
    return this.#routines;
  }

  get sails(): Signal<Record<string, ApiGetSailsSailId | null>> {
    return this.#sails;
  }

  fetchRoutines() {
    if (!this.#routineFetched) {
      this.#routineFetched = true;
      this.updateRoutines();
    }
  }

  updateRoutines() {
    this.http.get<ApiGetRoutines>('/api/v0/routines').subscribe((data) => {
      this.#routines.set(data.routines);
    });
  }

  startRoutines(routines: string[]) {
    return this.http.post<ApiPostSails>('/api/v0/sails', { routines });
  }

  deleteRoutine(routineId: string) {
    this.http.delete('/api/v0/routines/' + routineId).subscribe(() => {
      this.#routines.update((routines) => {
        const index = routines.findIndex((routine) => routine.id === routineId);
        routines.splice(index, 1);
        return [...routines];
      });
    });
  }

  // fetchSails() {
  //   this.http.get<ApiGetSails>('/api/v0/sails').subscribe();
  // }

  fetchSail(sailId: string) {
    return this.http.get<ApiGetSailsSailId>(`/api/v0/sails/${sailId}`).pipe(
      tap((data) => {
        this.#sails.update((sails) => {
          return { ...sails, [sailId]: data };
        });
      }),
    );
  }
}
