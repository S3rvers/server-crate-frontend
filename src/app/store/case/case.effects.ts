import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addCase,
  deleteCase,
  getCases,
  getSingleCase,
  gotCases,
  gotSingleCase,
  updateCase,
} from './case.actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AdminService } from '../../core/services/admin/admin.service';
import { Case, CaseResponse } from '../../types';
import { setLoadingSpinner } from '../loader/actions/loader.actions';
import { errorHandler } from '../../core/utils/helpers';
import { Router } from '@angular/router';

@Injectable()
export class CaseEffect {
  gotCases$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getCases),
      exhaustMap(() => {
        return this.adminService.getCases().pipe(
          tap((cases: CaseResponse) => {
            console.log('Cases', cases);
          }),
          map((response: CaseResponse) => {
            return gotCases({ cases: response });
          })
        );
      })
    );
  });

  getCase$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getSingleCase),
      switchMap(({ id }) => {
        return this.adminService.getCase(id).pipe(
          map((data: Case) => {
            return gotSingleCase(data);
          }),
          catchError((err) => {
            return of(
              setLoadingSpinner({
                isError: true,
                message: errorHandler(err),
                status: false,
              })
            );
          })
        );
      })
    );
  });
  deleteCase$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteCase),
      exhaustMap(({ id }) => {
        return this.adminService.deleteCase(id).pipe(
          map(() => {
            setTimeout(() => {
              this.router.navigateByUrl('/admin/case-management');
            }, 1500);
            return getCases();
          }),
          catchError((err) => {
            return of(
              setLoadingSpinner({
                isError: true,
                message: errorHandler(err),
                status: false,
              })
            );
          })
        );
      })
    );
  });

  addCase$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addCase),
      exhaustMap(({ formData }) => {
        return this.adminService.addCase({ formData }).pipe(
          map(() => {
            setTimeout(() => {
              this.router.navigateByUrl('/admin/case-management');
            }, 1500);
            return getCases();
          }),
          catchError((err) => {
            return of(
              setLoadingSpinner({
                status: false,
                message: errorHandler(err),
                isError: true,
              })
            );
          })
        );
      })
    );
  });

  updateCase$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateCase),
      exhaustMap(({ formData, id }) => {
        return this.adminService.updateCase({ formData, id }).pipe(
          map(() => {
            setTimeout(() => {
              this.router.navigateByUrl('/admin/case-management');
            }, 1500);
            return getCases();
          }),
          catchError((err) => {
            return of(
              setLoadingSpinner({
                status: false,
                message: errorHandler(err),
                isError: true,
              })
            );
          })
        );
      })
    );
  });

  constructor(
    private action$: Actions,
    private adminService: AdminService,
    private router: Router
  ) {}
}