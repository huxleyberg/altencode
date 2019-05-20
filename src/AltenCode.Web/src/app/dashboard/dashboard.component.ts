import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/services/dashboard.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ComponentsModule } from "app/components/components.module";
import { Observable, Subscription, timer, pipe } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;

  customers: any;
  vehicles: any;
  status_types = [
    {
      id: "connected",
      name: "connected"
    },
    {
      id: "disconnected",
      name: "disconnected"
    }
  ];
  subscription: Subscription;
  statusText: string;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.form = new FormGroup({
      customer: new FormControl(""),
      status: new FormControl("")
    });
    this.initCustomers();
    this.initVehicles();

    this.subscription = timer(0, 10000)
      .pipe(switchMap(() => this.dashboardService.changeVehicleStatus()))
      .subscribe(result => this.initVehicles());
  }

  initCustomers() {
    this.dashboardService.getAllCustomers().subscribe(response => {
      this.customers = response;
      console.log(response);
    });
  }

  initVehicles() {
    this.dashboardService.getAllVehicles().subscribe(response => {
      this.vehicles = response;
      console.log(response);
    });
  }

  searchVehicles() {
    const customer = this.form.controls["customer"].value;
    const status = this.form.controls["status"].value;

    this.dashboardService
      .searchVehicles(customer, status)
      .subscribe(response => {
        this.vehicles = response;
        console.log(response);
      });
  }
}
