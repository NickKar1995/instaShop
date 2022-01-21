import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginResponse } from 'src/app/models/LogInResponse';
import { AuthService } from 'src/app/services/auth.service';

// Init Local
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
  // Check for a better alternative
  isAuthorized: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      console.log('Subject Here!', responseData);
      this.isAuthorized = !!responseData.sessionToken;
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) return;

    //
    this.isLoggedIn = true;
    //
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;

    this.authService.signup(username, password).subscribe(
      (responseData: LoginResponse) => {
        this.isLoggedIn = false;
        storage.setItem('token', responseData.sessionToken);
      },
      (error: any) => {
        console.log('Something messed up the Login', error);
        this.error = 'An error occured';
        this.isLoggedIn = false;
      }
    );
    this.signupForm.reset();
    //
    this.modalRef?.hide();
  }

  handleNavbarButton(isAuthorized: boolean, template: TemplateRef<any>) {
    if (isAuthorized) {
      window.localStorage.clear();

      // this.router.navigate(['/']);
      window.location.reload();
    } else {
      this.modalRef = this.modalService.show(template);
    }
  }
}
