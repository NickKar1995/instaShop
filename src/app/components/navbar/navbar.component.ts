import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  modalRef?: BsModalRef;
  signupForm!: FormGroup;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    console.log('onINIT', this.signupForm);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
