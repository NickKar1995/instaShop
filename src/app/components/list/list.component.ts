import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Landmark } from 'src/app/models/Landmark';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  landmarks: Landmark[] | any = [];
  // Modal Ref
  modalRef?: BsModalRef;
  // Loading Spinner
  isAuthorized: boolean = false;
  // Form
  editForm!: FormGroup;

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

    this.editForm = new FormGroup({
      title: new FormControl(''),
      short_info: new FormControl(''),
      description: new FormControl(''),
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

  onEdit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmitEditForm(id: string) {
    console.log('id from the landmark in lsit', id);

    const title = this.editForm.value.title;
    const short_info = this.editForm.value.short_info;
    const description = this.editForm.value.description;

    const dataChange = {
      title: title,
      short_info: short_info,
      description: description,
    };

    this.dataService.update(id, dataChange).subscribe((response) => {
      console.log('response from list through service', response);
    });
    this.editForm.reset();
    //
    this.modalRef?.hide();
  }

  ngOnDestroy() {}
}
