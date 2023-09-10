import { Component } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  template: `
    <div class="center">
      <img
        src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"
      />
      <h1>Hey, this page does not exist !</h1>
      <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
        Back to home
      </a>
    </div>
  `,
  styles: [],
})
export class PageNotFoundComponent {}
