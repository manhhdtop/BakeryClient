import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit, OnChanges {
  cancel = 'CANCEL';
  ok = 'OK';

  @Input() title: string;
  @Input() content: string;
  @ViewChild('confirmModal') confirmModal;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
  }

  open(): Promise<string> {
    return this.modalService.open(this.confirmModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      backdrop: false,
      keyboard: false,
    }).result;
  }
}
