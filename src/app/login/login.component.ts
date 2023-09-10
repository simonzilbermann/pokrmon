import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [
    `
      .button-space {
        margin-left: 10px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  message: string = "You are offline.";
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "You are logged in.";
    } else {
      this.message = "Incorrect username or password.";
    }
  }

  login() {
    this.message = "Connection attempt in progress...";
    this.auth
      .login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.route.navigate(["/pokemons"]);
        } else {
          this.password = "";
          this.route.navigate(["/login"]);
        }
      });
  }
  register() {
    this.route.navigate(["/register"]);
  }

  logout() {
    this.auth.logout();
    this.message = "You are offline.";
  }
}
