import { Component, OnInit, ViewChild } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { PokemonService } from "../pokemon.service";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
  styles: [],
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[] | any;
  @ViewChild("audioPlayer") audioPlayer: HTMLAudioElement;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.loadData().subscribe((val) => {
      this.pokemonList = val;
    });
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
