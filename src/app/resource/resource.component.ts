import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrls: ["./resource.component.css"],
})
export class ResourceComponent implements OnInit {
  constructor() {}

  sign = "-";

  colapse = false;
  emission = 2;
  ngOnInit(): void {}

  collapse() {
    this.colapse = !this.colapse;
    if (this.sign == "-") {
      this.sign = "+";
    } else {
      this.sign = "-";
    }
  }
}
