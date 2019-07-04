import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes} from '@angular/router';

import { MainComponent } from './Main/Main.component';
import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
import { HomeTwoComponent } from './Pages/Home/HomeTwo/HomeTwo.component';
import { HomeThreeComponent } from './Pages/Home/HomeThree/HomeThree.component';
import { CartComponent } from './Pages/Cart/Cart.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { ListaContratistaComponent } from './Pages/lista-contratista/lista-contratista.component';
import { AuthGuard } from './guards/auth.guard';
import { ComoFuncionaComponent } from './Pages/como-funciona/como-funciona.component';


export const AppRoutes : Routes = [
   {
      path : '',
      redirectTo: 'home',
      pathMatch: 'full',
   }, {
      path : '',
      component : MainComponent,
      children: [ 
         {
            path : 'home',
            component : HomeoneComponent
         },
         {
            path : 'home-two',
            component : HomeTwoComponent
         },
         {
            path : 'home-three',
            component : HomeThreeComponent
         },
         {
            path: 'products',
            loadChildren: './Pages/Products/Products.module#ProductsModule',
            canActivate:[AuthGuard]
         },
         {
            path: 'lista-contratistas',
            component: ListaContratistaComponent
         },
         {
            path: 'como-funciona',
            component: ComoFuncionaComponent
         },
         {
            path: 'cart',
            component: CartComponent
         },
         {
          path: 'not-found',
          component: NotFoundComponent
         },
         {
            path: 'session',
            loadChildren: './Pages/Session/Session.module#SessionModule'
         },
         {
            path: 'checkout',
            loadChildren: './Pages/Checkout/Checkout.module#CheckoutModule'
         },
         {
            path: '',
            loadChildren: './Pages/About/About.module#AboutModule'
         },
         {
            path: 'blogs',
            loadChildren: './Pages/Blogs/Blogs.module#BlogsModule'
         },
         {
            path: 'account',
            loadChildren: './Pages/UserAccount/UserAccount.module#UserAccountModule',
            canActivate:[AuthGuard]
         }
      ]
   },
   {
      path: '**',
      redirectTo: 'not-found'
   }
]
