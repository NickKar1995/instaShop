import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
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
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Loader
    let loader = new Loader({
      apiKey: 'AIzaSyC6yWvROmvIr70wYweDCx6Y0fEdk98Mb5s',
    });

    this.route.params.subscribe((params: Params) => {
      this.dataService
        .getById(params.id)
        .subscribe((landmark: LandmarkById) => {
          console.log(landmark);

          this.currentLandmark = landmark;
          // Ιnit Loading of Map
          loader.load().then(() => {
            new google.maps.Map(document.getElementById('map')!, {
              center: {
                lat: this.currentLandmark?.location[0],
                lng: this.currentLandmark?.location[1],
              },
              zoom: 8,
            });
          });
          // End Loading of Map
        });
    });
  }

  onGoBack() {
    this.router.navigate(['/']);
  }
}
