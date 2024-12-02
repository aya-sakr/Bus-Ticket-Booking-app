import { Routes } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { BookingComponent } from './component/booking/booking.component';

export const routes: Routes = [
  {path:'', redirectTo:'/search',pathMatch:'full'},
  {path:'search',component:SearchComponent},
  {path:'booking/:id',component:BookingComponent},
  {path:'**',component:SearchComponent}


];
