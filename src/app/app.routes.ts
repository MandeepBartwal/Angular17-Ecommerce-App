import { Routes } from '@angular/router';
import { FeatureComponent } from './modules/feature/feature.component';
import { HomeComponent } from './modules/feature/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { noAuthGuard } from './shared/guard/no-auth.guard';
import { ProductsComponent } from './modules/feature/products/products.component';
import { ProductDetailsComponent } from './modules/feature/product-details/product-details.component';
import { PageNotFoundComponent } from './shared/components/UI/page-not-found/page-not-found.component';
import { UpdateProductComponent } from './modules/feature/update-product/update-product.component';
import { LearnComponent } from './modules/feature/learn/learn.component';
import { AuthGuard } from './shared/guard/auth.guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    component: LoginComponent,
  },
  {
    path: '',
    component: FeatureComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'product',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-product/:id',
        component: UpdateProductComponent,
        canActivate: [AuthGuard],
      },
      { path: 'learn', component: LearnComponent, canActivate: [AuthGuard] },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
