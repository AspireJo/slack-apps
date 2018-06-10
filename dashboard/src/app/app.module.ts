/* angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* Components */
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/aspire-stars-dashboard/dashboard/dashboard.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoaderComponent } from './components/shared/loader/loader.component';


/* services */
import { SlackApiService } from './services/slack-api.service';
import { ComponentInteractions } from './services/component-interactions.service';

const appRoutes: Routes = [
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SlackApiService,
    ComponentInteractions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
