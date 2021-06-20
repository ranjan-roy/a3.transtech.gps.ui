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
    name: "Device Alarm",
    url: "/Device Alarm",
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
        name: "Vehicle Summary",
        url: "/Report/Vehicle Summary",
        icon: "fa fa-superscript",
      },
    ]
  },
];
