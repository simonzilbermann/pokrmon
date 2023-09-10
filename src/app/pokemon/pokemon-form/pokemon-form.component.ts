import { Component, Input, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes("add");
  }
  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  generateRandomId(len: number): number {
    const characters = "0123456789";
    let id = "";
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      id += characters.charAt(randomIndex);
    }
    return +id;
  }

  onSubmit() {
    if (this.isAddForm) {
      const pokemonData: Pokemon = {
        id: this.generateRandomId(10),
        name: this.pokemon.name,
        hp: this.pokemon.hp,
        cp: this.pokemon.cp,
        picture: this.pokemon.picture,
        types: this.pokemon.types,
        created: new Date(),
      };
      this.pokemonService.uploadImage(pokemonData);
    } else {
      this.pokemonService.updatePokemon(this.pokemon);
      this.router.navigate(["/pokemon", this.pokemon.id]);
    }
  }
}
