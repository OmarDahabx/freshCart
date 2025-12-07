import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { authGuard } from './core/guards/authGuard/auth-guard';
import { isLoggedGuard } from './core/guards/isLogged/is-logged-guard';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';


export const routes: Routes = [
    {path:'' , redirectTo:'home', pathMatch:'full'},
    {path:'', component:AuthLayoutComponent, canActivate:[isLoggedGuard] , children:[
        {path:'login' , component:LoginComponent , title:'Login Page'},
        {path:'register' , component:RegisterComponent , title:'Register Page'},
        {path:'forget' , component:ForgetPasswordComponent , title:'Forget Password Page'}
    ]},
    {path:'' , component:BlankLayoutComponent, canActivate:[authGuard] , children:[
        {path:'home' , loadComponent:()=>import('./features/home/home.component').then( (c)=>c.HomeComponent ) , title:'Home Page'},
        {path:'cart' , loadComponent:()=>import('./features/cart/cart.component').then( (c)=>c.CartComponent ) , title:'Cart Page'},
        {path:'products' , loadComponent:()=>import('./features/products/products.component').then( (c)=>c.ProductsComponent ) , title:'Products Page'},
        {path:'brands' , loadComponent:()=>import('./features/brands/brands.component').then( (c)=>c.BrandsComponent ), title:'Brands Page'},
        {path:'categories' ,loadComponent:()=>import('./features/categories/categories.component').then( (c)=>c.CategoriesComponent ), title:'Categories Page'},
        {path:'allorders' , loadComponent:()=>import('./features/allorders/allorders.component').then( (c)=>c.AllordersComponent ), title:'all orders Page'},
        {path:'details/:slug/:id' , loadComponent:()=>import('./features/details/details.component').then( (c)=>c.DetailsComponent ) , title:'details Page' , data: { prerender: false } },
        {path:'details/:id' , loadComponent:()=>import('./features/details/details.component').then( (c)=>c.DetailsComponent ) , title:'details Page' , data: { prerender: false }  },
        {path:'checkout/:id' ,  loadComponent:()=>import('./features/checkout/checkout.component').then( (c)=>c.CheckoutComponent )  , title:'checkout Page' , data: { prerender: false }  },
        {path:'categorydetails/:slug/:id' ,  loadComponent:()=>import('./features/category-details/category-details.component').then( (c)=>c.CategoryDetailsComponent )  , title:'Category Page' , data: { prerender: false }  },
        {path:'categorydetails/:id' ,  loadComponent:()=>import('./features/category-details/category-details.component').then( (c)=>c.CategoryDetailsComponent )  , title:'Category Page' , data: { prerender: false }  },
        {path:'brand/:id' ,  loadComponent:()=>import('./features/specific-brand/specific-brand.component').then( (c)=>c.SpecificBrandComponent )  , title:'Brand Page' , data: { prerender: false }  },
        {path:'brand/:slug/:id' ,  loadComponent:()=>import('./features/specific-brand/specific-brand.component').then( (c)=>c.SpecificBrandComponent )  , title:'Brand Page' , data: { prerender: false }  },
        
    ]},
    {path:'**' , component:NotfoundComponent , title:'Not Found Page'}
];
