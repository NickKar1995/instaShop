import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Landmark } from 'src/app/models/Landmark';
import { LandmarkById } from 'src/app/models/LandmarkById';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  currentLandmark!: LandmarkById;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log('ID HERE BOI', params.id);
      this.dataService
        .getById(params.id)
        .subscribe((landmark: LandmarkById) => {
          console.log(landmark);
          this.currentLandmark = landmark;
        });
    });
  }
}
