import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  data = [
    { label: "A ", value: 10 },
    { label: "B ", value: 20 },
    { label: "C ", value: 30 },
    { label: "D ", value: 30 },
    { label: "E ", value: 10 },
  ];

  eData = [
    { label: "Green House Gas emision", progress: 50, total: 100 },
    { label: "Renewable production", progress: 20, total: 100 },
    { label: "Ecology Strategies", progress: 80, total: 100 },
  ];
  constructor() {}

  getPieData() {
    return this.data;
  }

  getBarData() {
    return this.eData;
  }
}
