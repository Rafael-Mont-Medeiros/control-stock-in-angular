import { CategoriesService } from './../../../../services/categories/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/categories/GetCategoriesResponse';
import { CreateProductsRequest } from 'src/app/models/products/requeste/createProductRequest';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject

  public categoriesDatas: Array<GetCategoriesResponse> = []
  public selectedCategory: Array<{ name: string, code: string }> = []

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  })

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  };

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        }
      })
  };

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductsRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: Number(this.addProductForm.value.amount)
      };

      this.productsService.createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'sucesso',
                detail: 'Produto adicionado com sucesso.',
                life: 2500,
              });
            }
          }, error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'erro',
              detail: 'erro ai adicionar o produto',
              life: 2500,
            })
          }
        })
    }

    this.addProductForm.reset()
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };


}
