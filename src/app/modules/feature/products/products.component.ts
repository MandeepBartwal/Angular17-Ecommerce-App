/* eslint-disable @typescript-eslint/no-explicit-any */
import { product, productData } from './../../../shared/types/shared.types'
import { Component, OnInit } from '@angular/core'
import { SharedService } from '../../../shared/services/shared.service'
import { CurrencyPipe, PercentPipe } from '@angular/common'
import { ButtonComponent } from '../../../shared/components/UI/button/button.component'
import { ModalComponent } from '../../../shared/components/UI/modal/modal.component'
import { RouterModule } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, ButtonComponent, ModalComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>

  productList: product[] = []
  totalProduct: number = 0
  currentPage: number = 1
  searchInput: FormControl

  public modalBoxInfo: {
    isVisible: boolean
    id: number
    content: string
    title: string
    modalType: string
    buttonType: string
  } = {
    isVisible: false,
    id: 1,
    content: '',
    title: '',
    modalType: '',
    buttonType: '',
  }
  constructor(private _sharedService: SharedService) {
    this.searchInput = new FormControl('')
    this._unsubscribeAll = new Subject()
  }

  ngOnInit(): void {
    this.fetchProducts()
    this.searchInput.valueChanges
      .pipe(takeUntil(this._unsubscribeAll), debounceTime(300), distinctUntilChanged())
      .subscribe((searchText) => {
        console.log(searchText)
      })
  }

  fetchProducts = () => {
    this._sharedService.getAllProducts().subscribe((res: productData) => {
      this.productList = res.products
    })
  }

  deleteProduct(id: number) {
    this.modalBoxInfo = {
      isVisible: true,
      id: id,
      content: 'Are you sure you want to delete this product?',
      title: 'Delete Product',
      modalType: 'delete',
      buttonType: 'Delete',
    }
  }
  isModalOpen = (event: boolean) => {
    this.modalBoxInfo.isVisible = event
  }

  sortProducts = (deletedProduct: number) => {
    const index: number = this.productList.findIndex((item) => item.id === deletedProduct)
    if (index !== -1) {
      this.productList.splice(index, 1)
    }
  }
}
