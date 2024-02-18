import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { SharedService } from '../../../shared/services/shared.service'
import { product } from '../../../shared/types/shared.types'
import { CurrencyPipe, PercentPipe } from '@angular/common'
import { ButtonComponent } from '../../../shared/components/UI/button/button.component'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, PercentPipe, ButtonComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  public productIdFromRoute: number = 0
  public productData: product | undefined
  constructor(
    public _route: ActivatedRoute,
    public _sharedService: SharedService,
  ) {}
  ngOnInit() {
    const routeParams = this._route.snapshot.paramMap
    this.productIdFromRoute = Number(routeParams.get('id'))
    this.getProductDetails(this.productIdFromRoute)
  }

  getProductDetails = (id: number) => {
    this._sharedService.getProductDetails(id).subscribe((res: product) => {
      this.productData = res
    })
  }
}
