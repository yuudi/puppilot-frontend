import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import {
  ApiGetRoutines,
  ApiGetSails,
  ApiGetSailsSailId,
  ApiPostSails,
} from '../types';

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

  fetchSails() {
    this.http.get<ApiGetSails>('/api/v0/sails').subscribe((data) => {
      for (const sail of data.sails) {
        this.#sails.update((sails) => {
          sails[sail.id] = sails[sail.id] || null;
          return sails;
        });
      }
    });
  }

  fetchSail(sailId: number) {
    this.http
      .get<ApiGetSailsSailId>(`/api/v0/sails/${sailId}`)
      .subscribe((data) => {
        this.#sails.update((sails) => {
          sails[sailId] = data;
          return sails;
        });
      });
  }
}
