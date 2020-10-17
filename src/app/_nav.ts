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
    icon: "icon-cursor",
  },
  {
    name: "User",
    url: "/User",
    icon: "icon-cursor",
  },
  {
    name: "Device",
    url: "/Device",
    icon: "icon-cursor",
  },
  {
    name: "Alarm",
    url: "/Alarm",
    icon: "icon-cursor",
  },
  {
    name: "Geofencing",
    url: "/Geofencing",
    icon: "icon-cursor",
  },
];

const en = [
  {
    screenId: 4,
    name: "Device",
    description: "Device Management Screen",
    path: "string",
    moduleId: 0,
    parentId: 0,
    level: 0,
    accessLevel: 3,
    permissions: ["Add", "Edit", "View", "Delete"],
  },
  {
    screenId: 3,
    name: "Geofencing",
    description: "GeoFencing Management Screen",
    path: "string",
    moduleId: 0,
    parentId: 0,
    level: 0,
    accessLevel: 3,
    permissions: ["Add", "Edit", "View", "Delete"],
  },
  {
    screenId: 2,
    name: "User",
    description: "User Management Screen",
    path: "string",
    moduleId: 0,
    parentId: 0,
    level: 0,
    accessLevel: 2,
    permissions: ["Add", "Edit", "View", "Delete"],
  },
  {
    screenId: 1,
    name: "Vendor",
    description: "Vendor Management Screen",
    path: "string",
    moduleId: 0,
    parentId: 0,
    level: 0,
    accessLevel: 1,
    permissions: ["Add", "Edit", "View", "Delete"],
  },
  {
    screenId: 1,
    name: "Alarm",
    description: "Alarm Management Screen",
    path: "string",
    moduleId: 0,
    parentId: 0,
    level: 0,
    accessLevel: 1,
    permissions: ["Add", "Edit", "View", "Delete"],
  },
];
window.sessionStorage.setItem("entitlement", JSON.stringify(en));
