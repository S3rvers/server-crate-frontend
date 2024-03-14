import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "../../core/services/admin/admin.service";
import { deleteAllAdminOrders, getAdminOrders, getUserOrders, gotAdminOrders, gotUserOrders } from "./order.actions";
import { EMPTY, catchError, map, switchMap, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { errorHandler } from "../../core/utils/helpers";

@Injectable()
export class OrderEffects {
    getOrders$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getAdminOrders),
            switchMap(({ params }) => {
                return this.adminService.getAdminOrders(params).pipe(
                    map((orders) => {
                        return gotAdminOrders(orders)
                    }),
                    catchError((err) => {
                        this.toast.error(errorHandler(err), 'Error')
                        return EMPTY
                    })
                )
            })
        )
    })
    
    getUserOrders$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getUserOrders),
            switchMap(({ params }) => {
                return this.adminService.getUserOrders(params).pipe(
                    map((orders) => {
                        return gotUserOrders(orders)
                    }),
                    catchError((err) => {
                        this.toast.error(errorHandler(err), 'Error')
                        return EMPTY
                    })
                )
            })
        )
    })

    deleteAllAdminOrders$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteAllAdminOrders),
            switchMap(({ deleteList }) => {
                return this.adminService.deleteAllAdminOrders(deleteList).pipe(
                    map(() => {
                        this.toast.success('Deleted orders successfully', 'Success', { timeOut: 1500 })
                        return getAdminOrders({})
                    }),
                    catchError((err) => {
                        this.toast.error(errorHandler(err), 'Error')
                        return EMPTY
                    })
                )
            })
        )
    })

    constructor(private action$: Actions, private adminService: AdminService, private toast: ToastrService) {}
}