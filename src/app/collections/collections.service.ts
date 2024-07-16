import { Injectable, Signal } from '@angular/core';
import { storage } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  #collections = storage<Record<string, string[]>>('puppilot/collections', {
    default: [],
  });

  get collections(): Signal<Record<string, string[]>> {
    return this.#collections;
  }

  addCollection(name: string) {
    this.#collections.update((collections) => {
      return { ...collections, [name]: [] };
    });
  }

  removeCollection(name: string) {
    this.#collections.update((collections) => {
      const { [name]: _, ...rest } = collections;
      void _;
      return rest;
    });
  }

  addToCollection(name: string, routine: string[]) {
    this.#collections.update((collections) => {
      return { ...collections, [name]: [...collections[name], ...routine] };
    });
  }

  putToCollection(name: string, routine: string[]) {
    this.#collections.update((collections) => {
      return { ...collections, [name]: routine };
    });
  }
}
