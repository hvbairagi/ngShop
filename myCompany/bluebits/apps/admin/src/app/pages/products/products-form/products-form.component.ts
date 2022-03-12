import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Product,
  ProductsService,
} from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private _addProduct(productData: FormData) {
    this.productsService
      .createProduct(productData)
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is  created!`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!',
          });
        },
      });
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService
          .getProduct(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((product) => {
            this.productsForm.name.setValue(product.name);
            this.productsForm.category.setValue(product.category);
            this.productsForm.brand.setValue(product.brand);
            this.productsForm.price.setValue(product.price);
            this.productsForm.countInStock.setValue(product.countInStock);
            this.productsForm.isFeatured.setValue(product.isFeatured);
            this.productsForm.description.setValue(product.description);
            this.productsForm.richDescription.setValue(product.richDescription);
            this.imageDisplay = product.image;
            this.productsForm.image.setValidators([]);
            this.productsForm.image.updateValueAndValidity();
          });
      }
    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService
      .updateProduct(productFormData, this.currentProductId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is  updated!`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        },
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productsForm).map((key) => {
      productFormData.append(key, this.productsForm[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  onCancel() {
    this.location.back();
  }

  onImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productsForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
