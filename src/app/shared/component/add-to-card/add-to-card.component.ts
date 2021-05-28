import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from 'src/app/service/app-config.service';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.scss'],
})
export class AddToCardComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @ViewChild('modal') modal;

  imageVisible: string;
  baseUrl: string;

  constructor(
    private configService: AppConfigService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
  }

  ngOnChanges(): void {
    this.changeImage(0);
  }

  open(): void {
    this.modalService.open(this.modal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      backdrop: false,
      keyboard: false,
    });
  }

  changeImage(index): void {
    if (this.product?.images && this.product?.images.length > 0) {
      this.imageVisible = this.baseUrl + this.product.images[index].uri;
    } else {
      this.imageVisible = null;
    }
  }

  save(): void {
    console.log(this.modal);
  }
}
