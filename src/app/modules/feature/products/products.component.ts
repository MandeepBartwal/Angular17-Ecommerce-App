import { product } from './../../../shared/types/shared.types';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/UI/button/button.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, ButtonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productList: product[] = [];
  totalProduct: number= 0;
  currentPage: number = 1;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit(): void {
    this._sharedService.productData$.subscribe((res: any) => {
      if(res === null){
        this._sharedService.getAllProducts();
      }      
      this.productList = res.products;      
      this.totalProduct = res.total
    });
  }

}
