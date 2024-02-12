import { Routes } from '@angular/router';
import { FeatureComponent } from './modules/feature/feature.component';
import { HomeComponent } from './modules/feature/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { noAuthGuard } from './shared/guard/no-auth.guard';
import { ProductsComponent } from './modules/feature/products/products.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    {
        path: 'login',
        canActivate: [noAuthGuard],
        component: LoginComponent,
      },
    {
        path: '', component: FeatureComponent,
        children: [
            { path: "home", component: HomeComponent },
            {path: "product", component:ProductsComponent}
        ]
    }
];
