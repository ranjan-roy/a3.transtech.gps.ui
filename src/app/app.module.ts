import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./layouts";

import { P404Component } from "./core/components/error/404.component";
import { P500Component } from "./core/components/error/500.component";
import { LoginComponent } from "./core/components/login/login.component";
import { RegisterComponent } from "./core/components/register/register.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuardService } from "./core/service/auth-guard.service";
import { AuthService } from "./core/service/auth.service";
import { JwtModule } from "@auth0/angular-jwt";
import { LogoutComponent } from "./core/components/logout/logout.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { GeofencingModule } from "./features/geofencing/geofencing.module";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ImageFormatterComponent } from "./shared/table/cell-action/cell-image.component";
import { AgGridModule } from "ag-grid-angular";
import { environment } from "../environments/environment";
import { reducers } from "./state";
import { UserEffects } from "./state/user/user.effects";
import { DeviceEffects } from "./state/device/device.effects";
import { VendorEffects } from "./state/vendor/vendor.effects";
import { OperatorEffects } from "./state/operator/operator.effects";

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([ImageFormatterComponent]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    SharedModule,
    CoreModule,
    // initialize store by providing a set of reducers
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      UserEffects,
      DeviceEffects,
      VendorEffects,
      OperatorEffects,
    ]),
    // Note that you must instrument after importing StoreModule (non-prod)
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 15 })
      : [],
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    ImageFormatterComponent,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
