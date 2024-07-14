import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { ApiGetMarketRoutines } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  #routineFetched = false;
  #routines = signal<ApiGetMarketRoutines['routines']>([]);

  constructor(private http: HttpClient) {}

  get routines(): Signal<ApiGetMarketRoutines['routines']> {
    return this.#routines;
  }

  fetchRoutines() {
    if (!this.#routineFetched) {
      this.#routineFetched = true;
      this.updateRoutines();
    }
  }

  updateRoutines() {
    this.http
      .get<ApiGetMarketRoutines>('/api/v0/market/routines')
      .subscribe((data) => {
        this.#routines.set(data.routines);
      });
  }

  downloadRoutine(routineId: string) {
    const url = this.#routines().find((r) => r.id === routineId)?.url;
    if (!url) {
      throw new Error('Routine id not found :' + routineId);
    }
    return this.http.post('/api/v0/routines', { url });
  }
}
