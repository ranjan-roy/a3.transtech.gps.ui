export interface Device {
  deviceId: number;
  userId: number;
  user?: any;
  vendorId: number;
  vendor?: any;
  vehicleTypeId: number;
  vehicleType?: any;
  deviceTypeId: number;
  deviceType?: any;
  deviceAlarms: any[];
  serial: string;
  name: string;
  dateTime: Date;
  ignition: boolean;
  mileage: number;
  speed: number;
  altitude: number;
  satellites: number;
  latitude: number;
  longitude: number;
  voltageLevel: number;
  networkLevel: number;
  course: number;
  systemTime?: any;
  dataEvent: number;
  stop: boolean;
  stopDateTime: Date;
  online: boolean;
  lastIgnition: Date;
}

export interface User {
  userId: number;
  vendorId: number;
  companyName: string;
  vendor?: any;
  userName: string;
  password: string;
  email: string;
  contactPrimary?: any;
  contactSecondary?: any;
  profileId: number;
  style: string;
  attemps: number;
  lastVisit: Date;
  createdDate: Date;
  accessLevel: number;
}

export interface NotificationType {
  notificationTypeId: number;
  name: string;
  description: string;
}

export interface INotification {
  notificationId: number;
  deviceId: number;
  device: Device;
  userId: number;
  user: User;
  notificationTypeId: number;
  notificationType: NotificationType;
  message: string;
  timeStamp: Date;
  viewed: boolean;
}
