import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable()
export class PokemonService {
  pokemonList: Pokemon[] | any;
  pokemonSelected: Pokemon | undefined;

  constructor(private router: Router, private afs: AngularFirestore) {}

  loadData(): Observable<Object> {
    //recuper les donne firebase
    return this.afs
      .collection("pokemons")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getPokemonById(PokemonId: string): Observable<Pokemon | undefined> {
    return this.afs
      .collection("pokemons")
      .doc(String(PokemonId))
      .valueChanges()
      .pipe(
        map((data: any) => {
          if (data) {
            const pokemon: Pokemon = { ...data, id: PokemonId };
            return pokemon;
          } else {
            return undefined;
          }
        })
      );
  }

  loadDataEde(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loadData().subscribe(
        (val) => {
          this.pokemonList = val;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  searchPokemonList(term: string): Promise<Pokemon[]> {
    return new Promise((resolve, reject) => {
      this.loadDataEde();
      if (term.length <= 1) {
        resolve([]);
      }
      console.log(this.pokemonList);
      const matchingPokemon: Pokemon[] = this.pokemonList.filter(
        (item: { data: { name: any } }) =>
          item.data.name.toLowerCase().includes(term.toLowerCase())
      );
      console.log(matchingPokemon);
      resolve(matchingPokemon);
    });
  }

  updatePokemon(pokemon: Pokemon) {
    const pokemonId: string = pokemon.id + "";
    this.afs
      .collection("pokemons")
      .doc(pokemonId)
      .set(pokemon)
      .then(() => {
        this.router.navigate(["/pokemons"]);
      });
  }

  deletePokemonById(pokemonId: number) {
    this.afs.doc(`pokemons/${pokemonId}`).delete();
  }

  getPokemonTypeList(): string[] {
    return [
      "Plant",
      "Fire",
      "Water",
      "Bug",
      "Normal",
      "Electric",
      "Poison",
      "Stone",
      "Flight",
      "Fight",
      "Psych",
    ];
  }

  uploadImage(pokemonData: Pokemon) {
    console.log(pokemonData);

    this.saveData(pokemonData);
  }

  //pour garder dans la base de donne
  saveData(pokemonData: any) {
    this.afs
      .collection("pokemons")
      .add(pokemonData)
      .then((docRef) => {
        this.router.navigate(["/pokemons"]);
      });
  }
}
