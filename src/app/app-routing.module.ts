import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { InternalServerErrorComponent } from './components/error/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth-guard.class';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/master-page/master-page.module').then(m => m.MasterPageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin-master-page/admin-master-page.module').then(m => m.AdminMasterPageModule),
    canActivate: [AuthGuard],
  },
  // Error handler
  {path: 'internal-server-error', component: InternalServerErrorComponent},
  {path: 'unauthorized', component: AccessDeniedComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
