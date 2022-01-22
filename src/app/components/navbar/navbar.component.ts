import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginResponse } from 'src/app/models/LogInResponse';
import { AuthService } from 'src/app/services/auth.service';

const storage = window.localStorage;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  modalRef?: BsModalRef;
  signupForm!: FormGroup;
  isLoggedIn = false;
  error: string = '';
  isAuthorized: boolean = false;

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

    const token = window.localStorage.getItem('token');
    this.isAuthorized = !!token;

    this.authService.user.subscribe((responseData) => {
      this.isAuthorized = !!responseData.sessionToken;
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) return;

    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;

    this.authService.signup(username, password).subscribe(
      (responseData: LoginResponse) => {
        storage.setItem('token', responseData.sessionToken);
      },
      (error: any) => {
        console.log('Something messed up the Login', error);
        this.error = 'An error occured';
      }
    );
    this.signupForm.reset();
    this.modalRef?.hide();
  }

  handleNavbarButton(isAuthorized: boolean, template: TemplateRef<any>) {
    if (isAuthorized) {
      this.authService.logoutUser();
    } else {
      this.modalRef = this.modalService.show(template);
    }
  }
}
// window.localStorage.clear();
// window.location.reload();
