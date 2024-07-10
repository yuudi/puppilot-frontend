import { effect, signal, WritableSignal } from '@angular/core';

export function storage<T>(key: string, defaultValue: T): WritableSignal<T> {
  const storageValue = localStorage.getItem(key);
  const t = storageValue ? JSON.parse(storageValue) : defaultValue;
  const r = signal<T>(t);
  effect(() => {
    localStorage.setItem(key, JSON.stringify(r()));
  });
  return r;
}
