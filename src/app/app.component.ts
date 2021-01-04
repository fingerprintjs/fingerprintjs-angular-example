import { Component } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

// If you would like to hide your API keys, you can put them in a .env file.
// You can also simply whitelist the addresses from which you will be making the calls in your user dashboard
// For the server API key, we reccommend setting up an Auth Header instead, you can read more in the docs:
// https://dev.fingerprintjs.com/docs/server-api
const BROWSERAPIKEY = 'P7vQXeD8G1VlmDAwwFir';
const SERVERAPIKEY = '9MLmWT6ziZqePf9JrDZP';

// This will limit the amount of visits the api queries
const limitTo = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'fpjs-angular';
  visitorId: string = 'Waiting...';
  serverData: string = '';
  responseSummary: string = '';

  constructor() {
    // On page load, the visitor ID is aquired.
    this.getVisitorID();
  }

  /**
   * Function for getting visitorID from browser API
   */
  public getVisitorID(): void {
    FingerprintJS.load({
      token: BROWSERAPIKEY,
    })
      .then((fp) => fp.get())
      .then((result) => {
        this.visitorId = result.visitorId;
      });
  }

  /**
   * Uses the visitorID to query the server api with the respective API token. 
   */
  public callServerAPI(): void {
    fetch(
      `https://api.fpjs.io/visitors/${this.visitorId}?limit=${limitTo}&token=${SERVERAPIKEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.visits);
        this.responseSummary = `Received history of ${data.visits.length} visits:`;
        data = JSON.stringify(data.visits, null, 4);
        this.serverData = data;
      });
  }
}
