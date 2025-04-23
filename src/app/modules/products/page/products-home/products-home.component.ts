import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Subject, takeUntil } from 'rxjs';

import { DeleteProductaction } from 'src/app/models/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/components/services/products/products-data-transfer.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public productsData: GetAllProductsResponse[] = [];

  constructor(
    private productsService: ProductsService,
    private productsDataService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService : DialogService
  ) { }



  ngOnInit(): void {
    this.getServicetProductsDatas();
  };

  getServicetProductsDatas() {
    const productsLoaded = this.productsDataService.getProductsDatas();

    if (productsLoaded.length > 0) {
      this.productsData = productsLoaded
    } else this.getAPIProductsDatas()

  }

  handleProductionAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event?.action,
        width: '70%',
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          productsData : this.productsData
        },
      });
      this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getAPIProductsDatas(),
      })
    }
  };

  handleDeleteProductAction(event: { product_id: string, productName: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produdo: ${event?.productName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-tringle',
        acceptLabel: 'sim',
        rejectLabel: 'não',
        accept: ()=> this.deleteProduct(event?.product_id)
      })
    }
  };

  deleteProduct(product_id: string){
    if(product_id){
      this.productsService
      .deleteProduct(product_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response)=>{
          if(response){
            this.messageService.add({
              severity:'success',
              summary: 'sucesso',
              detail: 'produto removido',
              life: 2500,
            });

            this.getAPIProductsDatas();
          }
        },error(err) {
          console.log(err);
        },
      })
    }
  };

  getAPIProductsDatas() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsData = response;
          }
        },
        error: (err) => {
          console.log(err);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro.',
            detail: 'Erro ao buscar produtos.',
            life: 2500,
          }),

            this.router.navigate(['/dashboard'])

        }
      })
  };


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };


}
