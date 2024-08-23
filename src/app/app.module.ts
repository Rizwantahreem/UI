import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from "./nav/nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { HeadlineComponent } from "./headline/headline.component";
import { MidheadComponent } from "./midhead/midhead.component";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { DashboardComponent } from "./analytic/analytic.component";
import { ActionsComponent } from "./actions/actions.component";
import { EcologyComponent } from "./ecology/ecology.component";
import { MatTableModule } from "@angular/material/table";
import { ResourceComponent } from "./resource/resource.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeadlineComponent,
    MidheadComponent,
    DashboardComponent,
    ActionsComponent,
    EcologyComponent,
    ResourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
