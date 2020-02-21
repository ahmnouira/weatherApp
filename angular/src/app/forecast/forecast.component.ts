import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators, FormBuilder} from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';
import { Place } from '../model/place';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  
  forecastForm : FormGroup;
  geometry: Place;
  minWeather : number [][];
  maxWeather: number [][];
  weatherTime : any;
  weatherResult : boolean;
  chart : Chart;
  
  constructor(private fb: FormBuilder, private weatherService : WeatherAPIService) {
    this.forecastForm = fb.group({
      'location' : ['', Validators.required], 
      'forecastType' : 'daily'
    });
    
    this.geometry =  new Place("", "");
    this.minWeather = new Array();
    this.maxWeather = new Array();
    this.weatherResult = false;
   } 

   getForecast(fg : FormGroup) {
      this.weatherService.getGeomentry(fg.controls.location.value).subscribe((data :any )=> {
        this.geometry.latitude = data['results'][0].geometry.lat;
        this.geometry.longitude = data['results'][0].geometry.lng;
        this.weatherService.getCurrentWeather(this.geometry.longitude, this.geometry.latitude).subscribe((weatherData :any) =>{
          this.weatherResult = true;
          
          if(fg.value.forecastType === 'daily'){
            /* console.log(fg.value.forecastType); the same as console.log("form forecast :", fg.controls.forecastType.value); */
            console.log("weatherData.daily.data :", weatherData.daily.data);
            this.filterJson(weatherData.daily.data, fg.value.forecastType);
            
          this.chart = new Chart ({
            title : { text : 'Weather Forecast' },
            chart:  { type: 'column' },
            xAxis:  { categories: this.weatherTime },
            series: [
              { name : 'Min Temp', data: this.minWeather, type: undefined},
              { name : 'Max Temp',  data: this.maxWeather, type: undefined}
            ], 
          });
        }
        else
        {
          this.filterJson(weatherData.hourly.data, fg.value.forecastType);
          this.chart = new Chart({
            title : { text : 'Weather Forecast' },
            chart: { type: 'column' },
            xAxis: {
                       categories: this.weatherTime
                   },
            series: [
               { name : 'Min Temp', data: this.minWeather, type: undefined},
            ]
          });
        }
      });
    })

   }

   filterJson(json,forecastType)
  {
      this.minWeather = new Array();
      this.maxWeather = new Array();
      this.weatherTime = new Array();
      for(var i=0; i<json.length; i++)
      {
              var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        var b: Date = new Date(json[i].time * 1000);
        if(forecastType == "daily")
        {
          this.weatherTime.push(b.getDate()+" "+months[b.getMonth()]+" "+b.getFullYear());
          this.maxWeather.push(json[i].temperatureMax);
          this.minWeather.push(json[i].temperatureMin);
        }
        else
        {
          this.weatherTime.push(b.getDate()+" "+months[b.getMonth()]+" "+b.getFullYear() +"-"+b.getHours() +" hours");
          this.minWeather.push(json[i].temperature);
        }
      }
    }


  ngOnInit() {



  }

}
