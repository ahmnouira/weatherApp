import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';
import { Place } from '../model/place';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent implements OnInit {

  weatherForm : FormGroup;  // weather Page Form
  currentWeather :  any;    // store the data comes form darksky API
  weatherResult : boolean;  // 
  geometry : Place;
  icon : string;

  constructor(fb : FormBuilder, private weatherService : WeatherAPIService) {
    this.geometry = new Place("", "");
    this.weatherForm = fb.group({
      'location' : ['' , Validators.compose([Validators.required, Validators.pattern('[a-zA-Z, ]*'), Validators.minLength(3), Validators.maxLength(20)])]
    });

    this.currentWeather = {};
    this.weatherResult = false;
  
  }

  getWeather(fg : FormGroup) {
    // convert location to lat & lng ==> Gecoding using opencage API
    this.weatherService.getGeomentry(fg.controls.location.value).subscribe((data : any)  => {  
      console.log(data['results'][0].geometry);
      this.geometry.latitude = data['results'][0].geometry.lat;
      this.geometry.longitude = data['results'][0].geometry.lng;
      this.weatherService.getCurrentWeather(this.geometry.longitude, this.geometry.latitude).subscribe((weatherData: any) => {
        this.currentWeather = weatherData.currently;  // the currently weather data from darksky API
        console.log("currentWeather : ", this.currentWeather);
        this.weatherResult = true;
        if(String(this.currentWeather.summary).toLowerCase().indexOf("cloudy") > 0) {
            this.icon = 'cloud'
        } else if(String(this.currentWeather.summary).toLowerCase().indexOf("rainy") > 0 ){ 
          this.icon = 'skyatlas'
        } else if (String(this.currentWeather.summary).toLowerCase().indexOf("sunny") > 0 ) {
          this.icon ="sun"
        } else if  (String(this.currentWeather.summary).toLowerCase().indexOf("thunderstorm") > 0 ) {
          this.icon = "thumbtack"
        }

       

       });

      });
    
}
      

  ngOnInit() {

  }

}
