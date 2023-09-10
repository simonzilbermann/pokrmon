import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[] | any;
  pokemon: Pokemon | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.pokemonService.loadData().subscribe((val) => {
      this.pokemonList = val;
      const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
      console.log(pokemonId);
      if (pokemonId) {
        this.pokemon = this.pokemonList.find(
          (pokemon: { id: string }) => pokemon.id === pokemonId
        );
        console.log(this.pokemon);
      }
    });
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id);
    this.goBack();
  }

  goBack() {
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(["/edit/pokemon", pokemon.id]);
  }
}
