import { Component } from '@angular/core';
import { CuentaDataService } from './services/cuenta-data.service';
import { Cuenta } from './models/cuenta';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
