export interface LoginPayload {
    username: string,
    password: string
}

export interface User {
    userId: number,
    vendorId: number,
    userName: string,
    profileId: number,
    accessLevel: number,
    style: number,
    attemps: number,
    lastVisit: string,
    token: string
}

export class Notification {

    constructor(
        public id: number,
        public type: NotificationType,
        public title: string,
        public message: string,
        public timeout: number,
    ) { }

}

export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}
