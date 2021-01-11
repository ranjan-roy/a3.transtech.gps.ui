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
];
