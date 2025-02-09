import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import { NbAuthModule, NbAuthJWTToken } from '@nebular/auth';

import { NbFirebaseAuthModule, NbFirebasePasswordStrategy, NbFirebaseGoogleStrategy } from '@nebular/firebase-auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbThemeModule,
  NbLayoutModule,
  NbUserModule,
  NbSidebarModule,
  NbActionsModule,
  NbFormFieldModule,
  NbButtonModule,
  NbStepperModule,
  NbCardModule,
  NbInputModule,
  NbDatepickerModule,
  NbSearchModule,
  NbProgressBarModule,
  NbIconModule
} from '@nebular/theme';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/dashboard/header/header.component';
import { ProfileDataSteperComponent } from './pages/profile-data-steper/profile-data-steper.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';

// guards
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from "./auth/login.guard";
import { NoProfileGuard } from './auth/no-profile.guard';
import { ExistProfileGuard } from './auth/exist-profile.guard';

//directives
import { IfChangedToDirective } from './directive/if-changed-to.directive';
import { ActionsComponent } from './pages/dashboard/header/actions/actions.component';
// import {  } from '@types/d3-selection'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './pages/dashboard/profile/pie-chart/pie-chart.component';
import { DateSelectionComponent } from './pages/dashboard/profile/date-selection/date-selection.component';
import { MealsComponent } from './pages/dashboard/profile/meals/meals.component';
import { NutritionsComponent } from './pages/dashboard/profile/nutritions/nutritions.component';


@NgModule({
  declarations: [
    AppComponent,
    IfChangedToDirective,
    DashboardComponent,
    HeaderComponent,
    ProfileDataSteperComponent,
    ProfileComponent,
    ActionsComponent,
    PieChartComponent,
    DateSelectionComponent,
    MealsComponent,
    NutritionsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,
    NbIconModule,
    NbFirebaseAuthModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'password',
          rememberMe: true,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: true,
          socialLinks: [],
        },
        logout: {
          strategy: 'password',
        },
        requestPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        resetPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: {
            redirect: {
              success: 'pages/dashboard',
              failure: null,
            },
            defaultErrors: ['Login/Password combination is not correct, please try again.'],
          },
          register: {
            redirect: {
              success: 'auth/login',
            },
          },
          logout: {
            redirect: {
              success: 'auth/login',
            },
          },
          requestPassword: {
            redirect: {
              success: 'auth/request-password',
            },
          },
          resetPassword: {
            redirect: {
              success: 'auth/reset-password',
            },
          },
          token: {
            class: NbAuthJWTToken,
            token: 'token'
          }
        }),
        NbFirebaseGoogleStrategy.setup({
          name: 'google',
        }),
      ],
    }),
    NbUserModule,
    NbLayoutModule,
    NbActionsModule,
    NbFormFieldModule,
    NbDatepickerModule.forRoot(),
    NbInputModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbStepperModule,
    NbCardModule,
    NbSearchModule,
    NbProgressBarModule,
    NgxChartsModule,
  ],
  providers: [AuthGuard, LoginGuard, { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, ExistProfileGuard, NoProfileGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
