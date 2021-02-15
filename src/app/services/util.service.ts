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

  getHourBehindDateTime(hour: number = 1) {
    return {
      startDate: moment().subtract(hour, "hours").format("YYYY-MM-DD hh:mm:ss"),
      endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
  }
}
