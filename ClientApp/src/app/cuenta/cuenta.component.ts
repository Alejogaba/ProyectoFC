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
utilidad_ejercicio:Cuenta;
ganacia_perdida:Cuenta;
total_debe:number;
total_haber:number;
total_ingresos:number;
total_gastos:number;
total_costos:number;
total_activos:number;
total_pasivos:number;
total_patrimonio:number;
total_utilidad:number;
total_pasivo_y_patrimonio:number;
sum:number;
existe:boolean;
keyword = 'descripcion';
notFound="No encontrado";
private searchTerms = new Subject<string>();
  constructor(private cuentaservice:CuentaDataService) { }

  ngOnInit() {
    this.existe=false;
    this.sum=0;
    this.total_pasivo_y_patrimonio=0;
    this.total_utilidad=0;
    this.total_debe=0;
    this.total_haber=0;
    this.total_costos=0;
    this.total_gastos=0;
    this.total_ingresos=0;
    this.total_activos=0;
    this.total_pasivos=0;
    this.total_patrimonio=0;
    this.listacuentas=[];
    this.utilidad_ejercicio=new Cuenta;
    this.ganacia_perdida=new Cuenta;
    this.seleccionado=new Cuenta;
    this.cuentavacia=new Cuenta;
    this.newcuenta= [];
    this.get();
  }
  limpiar() {
    localStorage.clear();
    this.listacuentas.length=0;
    this.newcuenta.length=0;
    this.ngOnInit();
    setTimeout(() => {
      this.cargarlista();
       }, 500);
}
  get(){
    this.cuentaservice.get().subscribe(c=>{
      return this.Cuentas=c});
  }


  negativizar():Observable<any>{
    this.total_ingresos=0;
    this.total_gastos=0;
    this.total_costos=0;
    for (let index = 0; index < this.listacuentas.length; index++) {
      const element = this.listacuentas[index];
      if ((element.categoria=='I')&&(element.descripcion.includes("DEVOLUCION"))) {
        this.total_ingresos=this.total_ingresos-element.valor;
      }else{
        if ((element.categoria=='E')&&(element.descripcion.includes("DEVOLUCION"))) {
          this.total_gastos=this.total_gastos-element.valor;
      }else{
        if ((element.categoria=='C')&&(element.descripcion.includes("DEVOLUCION"))) {
          this.total_costos=this.total_costos-element.valor;
      }
    }
  }
  }
  return null;
}


  calcular_total_ingresos_costos_gastos():Observable<any>{
    this.total_costos=0;
    this.total_gastos=0;
    this.total_ingresos=0;
  for (let index = 0; index < this.listacuentas.length; index++) {
    const element = this.listacuentas[index];
    if ((element.categoria=='I')&&!(element.descripcion.includes("DEVOLUCION"))) {
      this.total_ingresos=this.total_ingresos+element.valor;
    }else{
      if ((element.categoria=='E')&&!(element.descripcion.includes("DEVOLUCION"))) {
        this.total_gastos=this.total_gastos+element.valor;
    }else{
      if ((element.categoria=='C')&&!(element.descripcion.includes("DEVOLUCION"))) {
        this.total_costos=this.total_costos+element.valor;
        }
      }
    }
  }


return null;
}
calcular_total_activos_pasivos_patrimonio():Observable<any>{
  this.total_activos=0;
    this.total_pasivos=0;
    this.total_patrimonio=0;
  for (let index = 0; index < this.listacuentas.length; index++) {
    const element = this.listacuentas[index];
    if (element.categoria=='A') {
      this.total_activos=this.total_activos+element.valor;
    }else{
      if ((element.categoria=='L')) {
        this.total_pasivos=this.total_pasivos+element.valor;
    }else{
      if ((element.categoria=='QR')||(element.categoria=='Q')) {
        this.total_patrimonio=this.total_patrimonio+element.valor;
        }
      }
    }
  }

  return null;
}
  
  
  cargarlista(){
    this.listacuentas=JSON.parse(localStorage.getItem("miscuentas"));
    setTimeout(() => {
      this.calcular_total();
      this.negativizar();
      setTimeout(() => {
        this.calcular_total_ingresos_costos_gastos();
        setTimeout(() => {
        this.total_utilidad=this.total_ingresos-(this.total_costos+this.total_gastos);
        setTimeout(() => {
         this.utilidad_ejercicio={id:1000,codigo:'3605',descripcion:'Utilidad del ejercicio',
        char:'a',categoria:'QR',link:'d',gifi:'32432',valor:this.total_utilidad};
        this.ganacia_perdida={id:1001,codigo:'5905',descripcion:'Ganancias y pérdidas',
        char:'a',categoria:'ER',link:'d',gifi:'32432',valor:this.total_utilidad};
        setTimeout(() => {
          if (this.existe==false) {
            this.listacuentas.push(this.utilidad_ejercicio);
            this.listacuentas.push(this.ganacia_perdida);
          }else{
            this.listacuentas.forEach(e => {
              if((e.codigo=='3605')||(e.codigo='5905')){
                e.valor=this.total_utilidad;
                this.existe=true;
              }
            });
          }      
          setTimeout(() => {
            this.calcular_total_activos_pasivos_patrimonio();
            this.total_pasivo_y_patrimonio=(this.total_pasivos+this.total_patrimonio);
             }, 500);
           }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }

  

  addproducto(): void {
    if (!this.newcuenta) { return; }

  }
  selectEvent(item) {
   this.seleccionado=item;
   this.seleccionado.valor=0;
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
