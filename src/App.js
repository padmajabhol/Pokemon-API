import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Pokeimg from "./Images/pokeapi_256.png";
function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      response => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      },
    );
  };
  return (
    <div className="App">
      <div className="titleSection">
        <h1>
          <img src={Pokeimg} alt="pokeimg" />
        </h1>
        <input
          type="text"
          onChange={event => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search a Pokemon</button>
      </div>
      <div className="displaySection">
        {!pokemonChosen ? (
          <h1> Choose a pokemon</h1>
        ) : (
          <>
            <div className="cards">
              <h2 className="heading">{pokemon.name}</h2>
              <img src={pokemon.img} alt={pokemon.name} />
              <h5>Species: {pokemon.species}</h5>
              <h5>Type: {pokemon.type}</h5>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
