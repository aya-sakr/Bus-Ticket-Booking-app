import { HttpClient ,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

// Import core RxJS functionalities


// Import operators



@Injectable({
  providedIn: 'root'
})
export class MasterService {
baseApi:string='https://projectapi.gerasim.in/api/BusBooking/'
httpOptions;


  constructor(private http:HttpClient) {
    this.httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'my-auth-token'
      })

    }
   }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  // getLocatons(){
  //   return this.http.get(this.baseApi + "GetBusLocations")

  // }
  getLocatons(){
    return this.http.get<any[]>(this.baseApi + "GetBusLocations")
  }

  searchBus(from:number, to:number,travelDate:string ){
    return this.http.get(` ${this.baseApi}searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`)
  }

  getBusSchedules(){
    return this.http.get(this.baseApi + "GetBusSchedules")
  }
  getBusSchedulesById(schaduleId:any){
    return this.http.get(`${this.baseApi}GetBusScheduleById?id=${schaduleId}`)
  }

   getBusVendorbyId(id:any){
    return this.http.get(`${this.baseApi}GetBusVendorsById?=${id}`)
   }

  getBusVendor(){
     return this.http.get(this.baseApi +"GetBusVendors")

  }
  getBookedSeats(schaduleId:any){
    return this.http.get(`${this.baseApi}getBookedSeats?shceduleId=${schaduleId}`)
  }

  postNewUser(object:any){

    return this.http.post<any>(`${this.baseApi}AddNewUser`,object,this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)

    )
  }
  getAllUsers(){
    return this.http.get(this.baseApi +"GetAllUsers")

  }
  postBusBooking(obj:any){
    return this.http.post(`${this.baseApi}PostBusBooking`, obj ,this.httpOptions)
  }

postUserLogin(object:object){
  return this.http.post(`${this.baseApi}login`, object ,this.httpOptions)

}

}
