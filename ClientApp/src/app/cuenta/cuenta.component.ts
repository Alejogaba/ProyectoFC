import { Component, OnInit } from '@angular/core';
import { CuentaDataService } from '../services/cuenta-data.service';
import { Cuenta } from '../models/cuenta';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
Cuentas:Cuenta[];
newcuenta:Cuenta[];
seleccionado:Cuenta;
listacuentas:Cuenta[];
estadoresultados:Cuenta[];
cuentavacia:Cuenta;
total_debe:number;
total_haber:number;
total_ingresos:number;
total_costos:number;
total_gastos:number;
sum:number;
keyword = 'descripcion';
notFound="No encontrado";
private searchTerms = new Subject<string>();
  constructor(private cuentaservice:CuentaDataService) { }

  ngOnInit() {
    this.sum=0;
    this.total_debe=0;
    this.total_haber=0;
    this.total_costos=0;
    this.total_gastos=0;
    this.total_ingresos=0;
    this.seleccionado=new Cuenta;
    this.cuentavacia=new Cuenta;
    this.newcuenta= [];
    this.get();
    
  }
  get(){
    this.cuentaservice.get().subscribe(c=>{
      return this.Cuentas=c});
  }

  negativizar():Observable<any>{
    this.total_ingresos=0;
    for (let index = 0; index < this.listacuentas.length; index++) {
      const element = this.listacuentas[index];
      if ((element.categoria=='I')&&(element.descripcion.includes("DEVOLUCION"))) {
        this.total_ingresos=this.total_ingresos-element.valor;
      }
    }
    return null;
  }

  calcular_total_ingresos_costos_gastos():Observable<any>{
  for (let index = 0; index < this.listacuentas.length; index++) {
    const element = this.listacuentas[index];
    if ((element.categoria=='I')&&!(element.descripcion.includes("DEVOLUCION"))) {
      this.total_ingresos=this.total_ingresos+element.valor;
    }else{
      return null;
      }
    }
  }
  
  
  
  cargarlista(){
    this.listacuentas=JSON.parse(localStorage.getItem("miscuentas"));
    setTimeout(() => {
      this.calcular_total();
      this.negativizar();
      setTimeout(() => {
        this.calcular_total_ingresos_costos_gastos();
      }, 500);
    }, 500);
  }

  

  addproducto(): void {
    if (!this.newcuenta) { return; }

  }
  selectEvent(item) {
   this.seleccionado=item;
  }

  

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
guardar(){
 this.guardarlocal();
 setTimeout(() => {
  this.cargarlista();
}, 500);
}
guardarlocal(){
  this.newcuenta.push(this.seleccionado);
  localStorage.setItem("miscuentas", JSON.stringify(this.newcuenta));
}
calcular_total():Observable<any>{
  this.total_debe=0;
  this.total_haber=0;
for (let index = 0; index < this.listacuentas.length; index++) {
  const element = this.listacuentas[index];
  if ((element.categoria=='A')||(element.categoria=='E')||(element.categoria=='C')) {
    this.total_debe=this.total_debe+element.valor;
  }else{
    this.total_haber=this.total_haber+element.valor;
  }
}
return null;
}

  onFocused(e) {
    // do something
  }
  
}
