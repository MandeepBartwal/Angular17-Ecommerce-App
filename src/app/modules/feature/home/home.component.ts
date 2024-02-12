import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { productData } from '../../../shared/types/shared.types';
import { CurrencyPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/UI/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public productData: productData | null = null;
  public searchText: string =''
  searchQuery$ = new BehaviorSubject<string>('');
  name: string = 'Add to cart'
  constructor(private _sharedServices: SharedService) {
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  searchProduct(event: any){
      this.searchQuery$.next(event.target.value)
      
  }

  fetchAllProducts() {
    this._sharedServices.getAllProducts().subscribe((res: any) => {
      this.productData = res;
    })
  }
}