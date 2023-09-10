import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pokemonTypeColor",
})
export class PokemonTypeColorPipe implements PipeTransform {
  transform(type: string): string {
    let color: string;

    switch (type) {
      case "Fire":
        color = "red lighten-1";
        break;
      case "Water":
        color = "blue lighten-1";
        break;
      case "Plant":
        color = "green lighten-1";
        break;
      case "Bug":
        color = "brown lighten-1";
        break;
      case "Normal":
        color = "grey lighten-3";
        break;
      case "Flight":
        color = "blue lighten-3";
        break;
      case "Poison":
        color = "deep-purple accent-1";
        break;
      case "Stone":
        color = "pink lighten-4";
        break;
      case "Psych":
        color = "deep-purple darken-2";
        break;
      case "Electric":
        color = "lime accent-1";
        break;
      case "Fight":
        color = "deep-orange";
        break;
      default:
        color = "grey";
        break;
    }

    return "chip " + color;
  }
}
