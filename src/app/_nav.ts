import { INavData } from "@coreui/angular";
interface NavData extends INavData {
  accessLevel: any[];
}
export const navItems: NavData[] = [
  {
    name: "Dashboard",
    url: "/Dashboard",
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
    url: "/Vendor",
    icon: "icon-cursor",
    accessLevel: [1],
  },
  {
    name: "User",
    url: "/User",
    icon: "icon-cursor",
    accessLevel: [2],
  },
  {
    name: "Device",
    url: "/Device",
    icon: "icon-cursor",
    accessLevel: [3],
  },
  {
    name: "GeoFencing",
    url: "/GeoFencing",
    icon: "icon-cursor",
    accessLevel: [3],
  },
];
