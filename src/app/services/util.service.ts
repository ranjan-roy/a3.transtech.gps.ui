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
  convertTime12to24 = time12h => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes, second] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:${second}`;
  };

  getHourBehindDateTime(startHour, endHour) {
    console.log(startHour, endHour);

    const ed = moment()
      .subtract(endHour, "hours")
      .format("YYYY-MM-DD/hh:mm:ss A");
    const splitED = ed.split("/");

    const sd = moment()
      .subtract(startHour, "hours")
      .format("YYYY-MM-DD/hh:mm:ss A");
    const splitSD = sd.split("/");

    const d = {
      startDate: `${splitED[0]} ${this.convertTime12to24(splitED[1])}`,
      endDate: `${splitSD[0]} ${this.convertTime12to24(splitSD[1])}`,
    };
    console.log(d);

    return d;
  }
}
