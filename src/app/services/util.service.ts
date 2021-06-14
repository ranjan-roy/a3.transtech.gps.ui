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
  convertTime12to24 = (time12h) => {
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
    return d;
  }

  formatBytes(bytes, decimals?) {
    if (bytes == 0) return "0 Bytes";
    const k = 1024,
      dm = decimals || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  isValidImageExtension(fileName) {
    var regexp;
    var extension = fileName.substr(fileName.lastIndexOf("."));
    if (
      extension.toLowerCase() == ".png" ||
      extension.toLowerCase() == ".PNG"
    ) {
      return true;
    }
    return false;
  }
}
