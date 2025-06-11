import { ResolveFn } from '@angular/router';

export const orderResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
