import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PokemonModule } from "./pokemon/pokemon.module";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment.prod";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,

    PokemonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
