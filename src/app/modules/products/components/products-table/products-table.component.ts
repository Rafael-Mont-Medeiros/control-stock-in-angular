import { Component, EventEmitter, Input, Output } from '@angular/core';

import { productEvent } from 'src/app/models/enums/products/productEvent';
import { DeleteProductaction } from 'src/app/models/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = []
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductaction>();


  public productSelected!: GetAllProductsResponse;
  public addProductEvent = productEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = productEvent.EDIT_PRODCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  };

  handleDeleteProduct(product_id: string, productName: string):void{
    if(product_id !=='' && productName !== ''){
      this.deleteProductEvent.emit({
        product_id,
        productName,
      })
    }
  };

}
