import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Place } from './model/place';


const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'https://api.darksky.net/forecast/c6a73a36b6977ff286cdd1759c37490c/',
  })
};


@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  googleURL  : string;
  // alternative for google
  opencagedataURL : string;
  
  forecastURl : string;
  location : Place[];
  weatherURL : string;


  constructor(private http : HttpClient) { 
    this.googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    this.opencagedataURL = `https://api.opencagedata.com/geocode/v1/json?q=`
    this.forecastURl = `https://api.forecast.io/forecast/${environment.darkskyAPI}/`;
    this.weatherURL = this.forecastURl;
  }


  // from darksku.net
  getCurrentWeather(longitude : string, latitiude : string) : Observable<Object>  {
    // console.log(this.http.request("GET", this.weatherURL + longitude + "," + latitiude))
    return this.http.jsonp(this.weatherURL + latitiude + "," + longitude, "callback")
    
  }

  getGeomentry(location: string) {
    console.log(`${this.opencagedataURL}${location}&key=${environment.opencagedataAPI}`)
    return this.http.get(`${this.opencagedataURL}${location}&key=${environment.opencagedataAPI}`);

  }
  
     // Problem! : to Google API you need to have a billing account 'Credit Card' 
     // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


  getGoogleAPI() : string {
    return this.googleURL;
  }

  
  getForecast() : string {
    return this.forecastURl;
  }
}
