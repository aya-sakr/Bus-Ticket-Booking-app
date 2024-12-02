import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  id:number=0
  bookedArray:number[]=[]
  allSeats:any
  seatsArray:number[]=[]
  result:any
  userSelectesArray:any[]=[]
  constructor(private activateRoute:ActivatedRoute,private masterService:MasterService){
    this.activateRoute.params.subscribe((res:any)=>{
      this.id=res.id
      console.log(this.id)
      this. getBookedSeats()
       this.getSchaduleById()

    })

  }
  getBookedSeats(){
    this.masterService.getBookedSeats(this.id).subscribe((res:any)=>{
       this.bookedArray=res
       console.log("booked",this.bookedArray)
    })
  }
  getSchaduleById(){
    this.masterService.getBusSchedulesById(this.id).subscribe((res:any)=>{
      this.allSeats=res
      console.log(this.allSeats)
      // to get all number of seats
       for (let index = 1; index  <= this.allSeats.totalSeats; index++) {

       this.seatsArray.push(index)
       console.log(this.seatsArray)


       }
    })
  }
   checkedBooked(item:number){
    return this.bookedArray.indexOf(item)


   }
   selectSeat(seat:number){
    const obj = {
      passengerId: 0,
      bookingId: 0,
      passengerName: "string",
      age: '',
      gender: "",
      seatNo: 0
    }
    obj.seatNo = seat
    this.userSelectesArray.push(obj)
    console.log(this.userSelectesArray)

   }
   bookNow(){
    const logged = localStorage.getItem("userRegister")
    if(logged !== null){
      const loggedData = JSON.parse(logged)
      const obj ={
        bookingId: 0,
        custId: loggedData.userId,
        bookingDate: new Date(),
        scheduleId: this.id,
        BusBookingPassengers: this.userSelectesArray


      }
      this.masterService.postBusBooking(obj).subscribe((res:any)=>{
        alert('bokking successfuly')
       this.result=res
       console.log(res)
      })


    }else{
      alert("You shoud login first")
    }




   }

   checkedSeatsChecked(seat:number){
    return this.userSelectesArray.findIndex(m=>m.seatNo == seat)
   }


}
