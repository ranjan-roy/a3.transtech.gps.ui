import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  getDayBehindDateTime(day: number = 1) {
    return {
      startDate: moment()
        .subtract(day * 24, "hours")
        .format("YYYY-MM-DD hh:mm:ss"),
      endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
  }

  getHourBehindDateTime(startHour: number = 6, endHour = 0) {
    return {
      endDate: moment()
        .subtract(endHour, "hours")
        .format("YYYY-MM-DD hh:mm:ss"),
      startDate: moment()
        .subtract(startHour, "hours")
        .format("YYYY-MM-DD hh:mm:ss"),
    };
  }
}
