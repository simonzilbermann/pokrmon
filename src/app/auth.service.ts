import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  map,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: boolean = false;
  redirecUrl: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login(name: string, password: string): Observable<boolean> {
    return from(this.afAuth.signInWithEmailAndPassword(name, password)).pipe(
      map((logRef) => {
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedIn = true;
        this.router.navigate(["/"]);
        return true; // Login success
      }),
      catchError((error) => {
        console.log(error);
        return throwError("Login failed"); // Login failure
      })
    );
  }

  register(name: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(name, password)
    ).pipe(
      map((userCredential) => {
        // Vous pouvez également enregistrer des informations supplémentaires sur l'utilisateur ici
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedIn = true;
        this.router.navigate(["/"]);
        return true; // Enregistrement réussi
      }),
      catchError((error) => {
        console.log(error);
        return throwError("Registration failed"); // Échec de l'enregistrement
      })
    );
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      //console.log(JSON.parse(JSON.stringify(user)));
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.loggedIn.next(false);
      this.isLoggedIn = false;
      this.router.navigate(["/login"]);
    });
  }

  isLoggedIns() {
    return this.loggedIn.asObservable(); // pour récupérer
  }
}
