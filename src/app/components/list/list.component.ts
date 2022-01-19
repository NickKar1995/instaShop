import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Landmark } from 'src/app/models/Landmark';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  landmarks: Landmark[] | any = [];
  // Modal Ref
  modalRef?: BsModalRef;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.retrieveLandmarks();
  }

  retrieveLandmarks() {
    this.dataService.getAll().subscribe(
      (landmarks: Landmark[]) => {
        this.landmarks = landmarks;
        console.log('landmarks', landmarks);
      },
      (error: any) => {
        console.log('Something messed up on fetch', error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
