import { product, productData } from './../../../shared/types/shared.types'
import { Component, OnInit } from '@angular/core'
import { SharedService } from '../../../shared/services/shared.service'
import { CurrencyPipe, PercentPipe } from '@angular/common'
import { ButtonComponent } from '../../../shared/components/UI/button/button.component'
import { ModalComponent } from '../../../shared/components/UI/modal/modal.component'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, ButtonComponent, ModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: product[] = []
  totalProduct: number = 0
  currentPage: number = 1
  public modalBoxInfo: { isVisible: boolean; content: string; title: string; modalType: string; buttonType: string } = {
    isVisible: false,
    content: '',
    title: '',
    modalType: '',
    buttonType: '',
  }
  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    this.fetchProducts()
  }

  fetchProducts = () => {
    this._sharedService.getAllProducts().subscribe((res: productData) => {
      this.productList = res.products
    })
  }

  deleteProduct() {
    this.modalBoxInfo = {
      isVisible: true,
      content: 'Are you sure you want to delete this product?',
      title: 'Delete Product',
      modalType: 'delete',
      buttonType: 'Delete',
    }
  }
}
