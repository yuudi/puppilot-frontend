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
      // collections[name] = [];
      // return collections;
      return { ...collections, [name]: [] }; // signal compatibility
    });
  }

  removeCollection(name: string) {
    this.#collections.update((collections) => {
      // delete collections[name];
      // return collections;
      const { [name]: _, ...rest } = collections;
      void _;
      return rest; // signal compatibility
    });
  }

  addToCollection(name: string, routine: string[]) {
    this.#collections.update((collections) => {
      // collections[name].push(...routine);
      // return collections;
      return { ...collections, [name]: [...collections[name], ...routine] }; // signal compatibility
    });
  }

  putToCollection(name: string, routine: string[]) {
    this.#collections.update((collections) => {
      // collections[name] = routine;
      // return collections;
      return { ...collections, [name]: routine }; // signal compatibility
    });
  }
}
