import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginResponse } from 'src/app/models/LogInResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  modalRef?: BsModalRef;
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) return;

    console.log(this.signupForm.value.username);

    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    this.authService.signup(username, password).subscribe(
      (responseData: LoginResponse) => {
        console.log('RESPONSE DATA', responseData);
      },
      (error: any) => {
        console.log('Something messed up the Login', error);
      }
    );
    this.signupForm.reset();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
