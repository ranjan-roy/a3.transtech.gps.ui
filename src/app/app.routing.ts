import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./layouts";
import { P404Component } from "./core/components/error/404.component";
import { P500Component } from "./core/components/error/500.component";
import { LoginComponent } from "./core/components/login/login.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { AuthGuardService } from "./core/service/auth-guard.service";
import { LogoutComponent } from "./core/components/logout/logout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "Dashboard",
    pathMatch: "full",
    canActivate: [AuthGuardService],
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuardService],
    data: {
      title: "Home",
    },
    children: [
      {
        path: "Dashboard",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "Vendor",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./features/vendor/vendor.module").then((m) => m.VendorModule),
      },
      {
        path: "User",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./features/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "Device",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./features/device/device.module").then((m) => m.DeviceModule),
      },
      {
        path: "Alarm",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./features/alarm/alarm.module").then((m) => m.AlarmModule),
      },
      {
        path: "Geofencing",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./features/geofencing/geofencing.module").then(
            (m) => m.GeofencingModule
          ),
      },
    ],
  },
  {
    path: "logout",
    component: LogoutComponent,
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
