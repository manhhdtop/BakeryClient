import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './master-page.component';
import { HomeComponent } from '../home/home.component';
import { CartComponent } from '../cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          page_title: 'menu.home.title',
        },
      },
      {
        path: 'cart',
        component: CartComponent,
        data: {
          page_title: 'menu.cart.title',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MasterPageRoutingModule {
}
