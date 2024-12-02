
import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

import{FormsModule} from '@angular/forms'
import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,DatePipe,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  // masterService = inject(MasterService)

  busLocations:any[]=[]
  schadule:any[]=[]
  searchBus:any[]=[]
  BusVendor:any[]=[]
  VendorName:any=[]
  vendorId:any
  bookedSeats:any
   data:any={
    fromLocation:'',
    toLocation:'',
    travelDate: ''
  }
  constructor(private masterService:MasterService){

  }

  ngOnInit(): void {
    this.getAllLocations()




  }

  getAllLocations(){
    this.masterService.getLocatons().subscribe((res:any)=>{
      this.busLocations =res

      this.getScheduale()



    })
  }
  getScheduale(){
    this.masterService.getBusSchedules().subscribe((res:any)=>{
      this.schadule = res

      console.log(this.schadule)




    })
  }
   getBusVendor(){
    this.masterService.getBusVendor().subscribe((res:any)=>{
      this.BusVendor =res
      // this.getBusVendorById()


       console.log(this.BusVendor)

    })




   }
   getSchaduleById(){
    this.masterService.getBusSchedulesById(this.searchBus[0].scheduleId).subscribe((res:any)=>{
      this.vendorId=res
      this.getBusVendorById()




      console.log('vendorId',this.vendorId)

    })
   }


   getBusVendorById(){
    this.masterService.getBusVendorbyId(this.vendorId.vendorId).subscribe((res:any)=>{
      this.VendorName=res


      console.log(this.VendorName,"vendor")

    })

   }


   getBookSeats(){
    this.masterService.getBookedSeats(this.searchBus[0].scheduleId).subscribe((res:any)=>{
       this.bookedSeats=res.length
       console.log(this.bookedSeats)
    })
   }

  onSearch(){
    const {fromLocation,toLocation,travelDate}=this.data
    this.masterService.searchBus(fromLocation, toLocation, travelDate).subscribe((res:any)=>{

      this.searchBus=res

      console.log(this.searchBus,"searchabus")
     this.getSchaduleById()
     this.getBookSeats()
     this. getBusVendor()







     if(this.searchBus.length == 0){
      alert ("no bus avaliable")

     }
    })

  }


}
