import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Landmark } from 'src/app/models/Landmark';
import { LandMarkList } from 'src/app/mocks/mockLandmarks';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  landmarks: Landmark[] | any = [];
  constructor(private dataService: DataService) {}

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
}
