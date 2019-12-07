import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Cuenta} from '../models/cuenta';
import { Observable, of } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
import { InjectionToken } from '@angular/core';
export const BASE_URL = new InjectionToken<string>('BASE_URL');
@Injectable({
  providedIn: 'root'
})
export class CuentaDataService {

 
  constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl:string) { }
  get(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.baseUrl+'api/Cuentas').pipe(
      tap(_ =>this.log('Se consulta la informacion')), 
      catchError(this.handleError<Cuenta[]>('GetProducto', [])));
  }
  searchCuentas(term: string): Observable<Cuenta[]> {
    const url = `${this.baseUrl + 'api/Cuentas/buscar?nombre='}/${term}`;
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Cuenta[]>(url).pipe(
      tap(_ => this.log(`Se encontro la cuenta "${term}"`)),
      catchError(this.handleError<Cuenta[]>('searchCuentas', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
       
      console.error(error); 
        
      this.log(`${operation} Fallo: ${error.message}`);
       
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`${message}`);
   }
}
