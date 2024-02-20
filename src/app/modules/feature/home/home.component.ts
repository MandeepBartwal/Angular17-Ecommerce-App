import { Component, OnInit } from '@angular/core'
import { SharedService } from '../../../shared/services/shared.service'
import { productData } from '../../../shared/types/shared.types'
import { CurrencyPipe } from '@angular/common'
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'
import { ButtonComponent } from '../../../shared/components/UI/button/button.component'
import { RouterModule } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public productData: productData | null = null
  searchInput: FormControl;
  searchQuery$ = new BehaviorSubject<string>('')
  name: string = 'Add to cart'
  private _unsubscribeAll: any
  constructor(private _sharedServices: SharedService) {
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.fetchAllProducts()
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchText) => {
        this._sharedServices.searchProduct(searchText).subscribe((res: any) => {
          this.productData = res;
        });
      });
  }

  searchProduct(searchValue: string) {
    this.searchQuery$.next(searchValue)
  }

  fetchAllProducts() {
    this._sharedServices.getAllProducts().subscribe((res: productData) => {
      this.productData = res
    })
  }
}
