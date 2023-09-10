import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  template: `
    <div class="row">
      <div class="col s12 m4 offset-m4">
        <div class="card hoverable">
          <div class="card-content center">
            <span class="card-title">Register page</span>
            <p>
              <em>{{ message }}</em>
            </p>
          </div>
          <form #registerForm="ngForm">
            <div>
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                [(ngModel)]="name"
                name="name"
                required
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                [(ngModel)]="password"
                name="password"
                required
              />
            </div>
          </form>
          <div class="card-action center">
            <a (click)="register()" class="waves-effect waves-light btn"
              >Register</a
            >
            <a
              (click)="login()"
              class="waves-effect waves-light btn button-space"
              >Login</a
            >
            <!-- Ajoutez la classe ici -->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .button-space {
        margin-left: 10px;
      }
    `,
  ], // Définissez la classe de style dans le tableau des styles
})
export class RegisterComponent implements OnInit {
  message: string = "Create your account";
  name: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.register();
  }
  login() {
    this.router.navigate(["/login"]);
  }
  register() {
    this.message = "Registration in progress...";
    // Appel à un service d'authentification pour effectuer l'inscription
    this.authService
      .register(this.name, this.password)
      .subscribe((isRegistered: boolean) => {
        if (isRegistered) {
          this.message = "Registration successful. You can now log in.";
          // Rediriger vers la page de connexion après l'inscription
          this.router.navigate(["/login"]);
        } else {
          this.message = "Registration failed. Please try again.";
        }
      });
  }
}
