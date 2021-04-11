import { INavData } from "@coreui/angular";
export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/Dashboard",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Features",
  },
  {
    name: "Vendor",
    url: "/Vendor",
    icon: "fa fa-handshake-o",
  },
  {
    name: "User",
    url: "/User",
    icon: "fa fa-users",
  },
  {
    name: "Device",
    url: "/Device",
    icon: "fa fa-usb",
  },
  {
    name: "DeviceAlarm",
    url: "/DeviceAlarm",
    icon: "fa fa-bell",
  },
  {
    name: "Geofencing",
    url: "/Geofencing",
    icon: "fa fa-map",
  },
  {
    name: "Report",
    url: "/Report",
    icon: "fa fa-file",
    children: [
      {
        name: "VehicleSummary",
        url: "/Report/VehicleSummary",
        icon: "fa fa-superscript",
      },
    ]
  },
];
