import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class PokemonApiServices{
    pokemonSpecies:any;
    pokemonSpeciesURLList:any[] = [];
    pokemonArray:Pokemon[] = [];

    jsonPokemons:any[] = [];
    
    constructor(private httpClient:HttpClient){

    }
    //Hacer funcion de juntar datos de un pokemon solo
    singlePokemonApi(id:string){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        return this.httpClient.get(url);       
    }

    jsonSinglePokemon(url:string){
        return this.httpClient.get(url);
    }

    

    generationPokemonApi(generation:string){ //Junta todo el dato de la generacion
        const url = `https://pokeapi.co/api/v2/generation/${generation}`;
        return this.httpClient.get(url);     
    }

    obtenerListaPokemonApi(generation:string){ //obtiene el dato de la generacion en formato json

        this.generationPokemonApi(generation).subscribe(
            res=>{
                this.pokemonSpecies = res;    
            }
        )
    }

    listaSpeciesPokemon(generation:string){ //Guarda la lista de especies de pokemon de esa generacion
        this.obtenerListaPokemonApi(generation);
        for (let pokemon of this.pokemonSpecies.pokemon_species) {
            this.pokemonSpeciesURLList.push(pokemon);
        }
        this.datesSinglePokemons();
    }

    datesSinglePokemons(){
        let jsonPokemon:any;
        let jsonPoke:any;
        let description = "";
        let type2 = "None"
    
        for (const pokemon of this.pokemonSpeciesURLList) {
           
            this.jsonSinglePokemon(pokemon.url).subscribe(
                res => {
                    jsonPokemon = res;
                    this.datesJsonPoke(jsonPokemon);
                    
                }
            );
     }
      console.log(this.pokemonArray);      
          
    }

    datesJsonPoke(jsonPokemon:any){
        let jsonPoke:any;
        this.singlePokemonApi(jsonPokemon.id).subscribe(
            res =>{
                jsonPoke = res;
                 this.createArrayPokemon(jsonPokemon,jsonPoke);
            }
        )
    }

    createArrayPokemon(jsonPokemon:any, jsonPoke:any){
             
        let description = "";
        let type2 = "None"
        /*if(jsonPoke.types.length == 1){
                        type2 = jsonPoke.types[1].name; 
                    }*/
                    //console.log(jsonPokemon.generation.name);
                    
     this.pokemonArray.push(new Pokemon(jsonPokemon.id, 
        jsonPokemon.name,
        jsonPokemon.generation.name,
        jsonPoke.sprites.front_default,
        jsonPoke.sprites.back_default,
        jsonPokemon.egg_groups[0].name,
        "description",
        jsonPoke.types[0].name, 
        type2, 
        jsonPoke.stats[1].base_stat,
        jsonPoke.stats[3].base_stat,
        jsonPoke.stats[5].base_stat,
        jsonPoke.stats[2].base_stat,
        jsonPoke.stats[4].base_stat,
        jsonPoke.stats[0].base_stat,
        jsonPoke.heigth,
        jsonPoke.weight));
    }

}