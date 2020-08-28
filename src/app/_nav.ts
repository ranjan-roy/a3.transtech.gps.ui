import { INavData } from "@coreui/angular";
interface NavData extends INavData {
  accessLevel: any[];
}
export const navItems: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
    accessLevel: [1, 2],
  },
  {
    title: true,
    name: "Features",
    accessLevel: [1, 2, 3],
  },
  {
    name: "Vendor",
    url: "/vendor",
    icon: "icon-cursor",
    accessLevel: [1],
  },
  {
    name: "User",
    url: "/user",
    icon: "icon-cursor",
    accessLevel: [2],
  },
  {
    name: "Device",
    url: "/device",
    icon: "icon-cursor",
    accessLevel: [3],
  },
  {
    name: "GeoFencing",
    url: "/geofencing",
    icon: "icon-cursor",
    accessLevel: [3],
  },
];
