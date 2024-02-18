/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { modalInfo } from '../../../types/shared.types'
import { SharedService } from '../../../services/shared.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  public isShow: boolean = false
  @Output() modal = new EventEmitter<boolean>()
  @Output() deletedProduct = new EventEmitter<number>()
  @Input() modalContent!: modalInfo
  @Input() set openBlockModal(value: boolean) {
    this.isShow = value
  }

  constructor(
    public _sharedService: SharedService,
    public _toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  deleteProduct = () => {
    this._sharedService.deleteProduct(this.modalContent.id).subscribe((res: any) => {
      if (res.isDeleted === true) {
        this._toastr.success('product has been deleted successfully!')
        this.isShow = false
        this.modal.emit(false)
        this.deletedProduct.emit(this.modalContent.id)
      }
    })
  }
  closeModal = () => {
    this.isShow = false
    this.modal.emit(false)
  }
}
