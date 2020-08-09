import { INavData } from "@coreui/angular";
interface NavData{
  name: string,
  url: string
  icon: string
  accessLevel: string[]
}
export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
    accessLevel: [1, 2],
  },
  {
    title: true,
    name: "Features",
    accessLevel: [1, 2],
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
    accessLevel: [2, 1],
  },
];
