import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { CustomImageComponent } from '../../../../../../shared/components/custom-image/custom-image.component';
import { AuthLoaderComponent } from '../../../../../../shared/components/auth-loader/auth-loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroupExtension, RxFormBuilder, RxFormGroup, RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { IncompatiblesComponent } from '../../../../../../shared/components/incompatibles/incompatibles.component';
import { AttributeOption, BasicConfig, Case, LoadingStatus } from '../../../../../../types';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../../../core/services/admin/admin.service';
import { deleteProduct } from '../../../../../../store/admin/products/categories.actions';
import { selectLoaderState } from '../../../../../../store/loader/reducers/loader.reducers';
import { setLoadingSpinner } from '../../../../../../store/loader/actions/loader.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CURRENT_AD_TAB } from '../../../../../../core/utils/constants';
import { caseInitialState, selectCase } from '../../../../../../store/case/case.reducers';
import { getSingleCase, resetCase } from '../../../../../../store/case/case.actions';

@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [
    CommonModule,
    CustomInputComponent,
    CustomImageComponent,
    AuthLoaderComponent,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    IncompatiblesComponent
  ],
  templateUrl: './add-case.component.html',
})
export class AddCaseComponent implements OnInit, OnDestroy {
  private option$ = new Subject<BasicConfig>();
  private case$ = new BehaviorSubject<Case>(caseInitialState.case)
  loadingState$!: Observable<LoadingStatus>;
  options = this.option$.asObservable();
  caseForm!: RxFormGroup;
  case = this.case$.asObservable()
  formGroup = {};
  id: string = '';
  coverImage: string | null = null;
  image1: string | null = null;
  image2: string | null = null;
  image3: string | null = null;

  incompatibleVariants: AttributeOption[] = []
  incompatibleAttributeOptions: string[] = []
  constructor(
    private fb: RxFormBuilder,
    private store: Store,
    private router: Router,
    private adminService: AdminService,
    private destroyRef: DestroyRef,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.formGroup = {
      images: null,
      coverImage: null,
      name: [
        '',
        RxwebValidators.required({ message: 'Please enter a product name' }),
      ],
      description: [
        '',
        RxwebValidators.required({
          message: 'Please enter a product description',
        }),
      ],
      price: [
        '',
        RxwebValidators.required({ message: 'Please enter a price' }),
      ],
      image1: null,
      image2: null,
      image3: null,
      incompatibleVariants: null,
    };
    this.caseForm = <RxFormGroup>this.fb.group(this.formGroup);
    
    if (this.id) {
      this.store.dispatch(getSingleCase({ id: this.id }));
      this.case = this.store
        .select(selectCase)
        .pipe(
          tap((data: Case) => {
            
            this.formGroup = {
              name: data.name,
              description: data.description,
              price: data.price,
              coverImage: data.coverImageUrl,
              incompatibleVariants: data.incompatibleVariants,
              images: data.imageUrls,
              image1: data.imageUrls[0],
              image2: data.imageUrls[1],
              image3: data.imageUrls[2]
              
            };

            this.coverImage = data.coverImageUrl;
            this.image1 = data.imageUrls[0] || null;
            this.image2 = data.imageUrls[1] || null;
            this.image3 = data.imageUrls[2] || null;

            this.caseForm.patchValue({ ...this.formGroup });
          })
        )
    }
    this.loadingState$ = this.store.select(selectLoaderState);
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCase())
  }

  replaceImage(obj: { imgSrc: string; imageToChange: string }) {
    const setterFunctions: Record<string, (src: string) => void> = {
      coverImage: (src: string) => {
        this.coverImage = src;
      },
      image1: (src: string) => {
        this.image1 = src;
      },
      image2: (src: string) => {
        this.image2 = src;
      },
      image3: (src: string) => {
        this.image3 = src;
      },
    };

    const setter = setterFunctions[obj.imageToChange];
    if (setter) {
      setter(obj.imgSrc);
    }
  }
  cancel() {
    this.router.navigateByUrl('/admin/case-management');
  }
  removeImage(imageToRemove: string) {
    if (imageToRemove === 'coverImage') {
      this.removeCoverImage();
    } else if (imageToRemove === 'image1') {
      this.removeImage1();
    } else if (imageToRemove === 'image2') {
      this.removeImage2();
    } else {
      this.removeImage3();
    }
  }
  removeCoverImage() {
    this.caseForm.patchValue({ coverImage: null });
    this.coverImage = null;
  }
  removeImage1() {
    this.caseForm.patchValue({ image1: null });
    this.image1 = null;
  }
  removeImage2() {
    this.caseForm.patchValue({ image2: null });
    this.image2 = null;
  }
  removeImage3() {
    this.caseForm.patchValue({ image3: null });
    this.image3 = null;
  }

  deleteProduct(id: string) {
    scrollTo({ top: 0, behavior: 'smooth' });
    this.store.dispatch(deleteProduct({ id }));
  }

  getIncompatibleAttributeOptions({index, variants}: {index: number, variants: string[]}) {
    this.incompatibleAttributeOptions = variants
    console.log('Incompatibles', this.incompatibleAttributeOptions);
    
  }
  addCase() {
    if (this.caseForm.invalid) return;
    this.store.dispatch(
      setLoadingSpinner({
        status: true,
        message: '',
        isError: false,
      })
    );
    scrollTo({ top: 0, behavior: 'smooth' });
    const formData: FormData = (<FormGroupExtension>(
      this.caseForm
    )).toFormData();

    const coverImage = formData.get('coverImage[0]');
    const image1 = formData.get('image1[0]');
    const image2 = formData.get('image2[0]');
    const image3 = formData.get('image3[0]');
    
    formData.delete('coverImage[0]');
    formData.delete('image1[0]');
    formData.delete('image2[0]');
    formData.delete('image3[0]');
    formData.delete('images[0]');

    formData.set('coverImage', coverImage!);
    formData.append('images', image1!);
    formData.append('images', image2!);
    formData.append('images', image3!);

    this.incompatibleAttributeOptions.forEach((attributeOption) => {
      formData.append('incompatibleVariants', attributeOption)
    })

    if (this.id) {
      this.adminService
        .updateProduct(this.id, formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          error: (err) => {
            this.store.dispatch(
              setLoadingSpinner({
                status: false,
                message:
                  err.error?.detail || 'Server response error',
                isError: true,
              })
            );
          },
          complete: () => {
            this.store.dispatch(
              setLoadingSpinner({
                status: false,
                message: 'Edited case successfully',
                isError: false,
              })
            );
            setTimeout(() => {
              this.router.navigateByUrl('/admin/case-management');
            }, 1500);
          },
        });
    } else {
      this.adminService
        .addCase(formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          error: (err) => {
            this.store.dispatch(
              setLoadingSpinner({
                status: false,
                message:
                  err.error?.detail || 'Please enter all the required data',
                isError: true,
              })
            );
          },
          complete: () => {
            this.store.dispatch(
              setLoadingSpinner({
                status: false,
                message: 'Added product successfully',
                isError: false,
              })
            );
            setTimeout(() => {
              this.router.navigateByUrl('/admin/case-management');
              sessionStorage.setItem(CURRENT_AD_TAB, 'Dashboard')

            }, 1500);
          },
        });
    }
  }
  get name() {
    return this.caseForm.get('name')!;
  }
  get description() {
    return this.caseForm.get('description')!;
  }
}
