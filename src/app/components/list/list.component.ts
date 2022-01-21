import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Landmark } from 'src/app/models/Landmark';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  landmarks: Landmark[] | any = [];
  // Modal Ref
  modalRef?: BsModalRef;
  isAuthorized: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.retrieveLandmarks();
    const token = window.localStorage.getItem('token');
    this.isAuthorized = !!token;
    console.log(this.isAuthorized, 'token', !!token);

    this.authService.user.subscribe((responseData) => {
      console.log('Subject Here!', responseData);
      this.isAuthorized = !!responseData.sessionToken;
    });
  }

  retrieveLandmarks() {
    this.dataService.getAll().subscribe(
      (landmarks: Landmark[]) => {
        this.landmarks = landmarks;
      },
      (error: any) => {
        console.log('Something messed up on fetch', error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy() {}
}
