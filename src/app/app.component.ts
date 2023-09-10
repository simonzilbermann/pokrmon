import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  name: string;
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      this.name = user.email;
    } else {
      this.name = "";
    }
    this.isLoggedIn$ = this.auth.isLoggedIns();
  }

  onLogOut() {
    this.auth.logout();
  }
}
