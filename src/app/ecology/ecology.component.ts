import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ecology",
  templateUrl: "./ecology.component.html",
  styleUrls: ["./ecology.component.css"],
})
export class EcologyComponent implements OnInit {
  displayedColumns: string[] = [
    "Ecology Strategy",
    "Yes, there is a strategy in place",
    "No strategy, but plan to develop one",
    "No strategy and no plan to develop one",
  ];

  collspse = false;

  data = [
    {
      ecologyStrategy: "Responsibly sourced materials for new development",
      yes: "yes",
      noPlan: "",
      no: "",
    },
    {
      ecologyStrategy: "Waste management of building materials",
      yes: "yes",
      noPlan: "",
      no: "",
    },
    {
      ecologyStrategy: "Managing and reducing pollutants",
      yes: "",
      noPlan: "noPlan",
      no: "",
    },
    {
      ecologyStrategy: "Water management",
      yes: "yes",
      noPlan: "",
      no: "",
    },
  ];

  dataSource = this.data;
  sign = "-";

  constructor() {}

  ngOnInit(): void {}

  check() {
    this.collspse = !this.collspse;
    if (this.sign == "-") {
      this.sign = "+";
    } else {
      this.sign = "-";
    }
  }
}
