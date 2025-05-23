import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from './../../../../shared/components/services/products/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';

import { ChartData, ChartOptions } from 'chart.js'

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>()
  public productsList: Array<GetAllProductsResponse> = [];

  public produtsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService,
  ) { }

  ngOnInit(): void {
    this.getProductsDatas(); // 👈 agora sim será chamado ao carregar o componente
  }

  getProductsDatas(): void {
    this.productService.getAllProducts().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productsList = response;
          this.productsDataTransferService.setPoductsDatas(this.productsList)
          this.setProductsChartConfig()
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'erro ao buscar produtos!',
          life: 2500,
        })
      }
    })
  }

  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyPriority('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--Text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.produtsChartDatas = {
        labels: this.productsList.map((element) => element?.name),
        datasets: [
          {
            label: 'quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indico-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indido-500'),
            data: this.productsList.map((element) => element?.amount),

          },
        ],
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 'bolder',
              },
            },

            grid: {
              color: surfaceBorder
            }
          },

          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder
            },
          },
        },
      };

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

