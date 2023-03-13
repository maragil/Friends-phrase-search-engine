/* SECCIÓN DE IMPORT */
import '../styles/App.scss';
import phrases from '../data/phrases.json';
import { useState } from 'react';


/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [allData, setAllData] = useState(phrases);
  const [searchQuote, setSearchQuote] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('all');
  /* FUNCIONES HANDLER */
  const handleFilterQuote = (ev) => {
    setSearchQuote(ev.target.value);
  }
  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderList = () => {
    return allData
    .filter((eachQuote) => eachQuote.quote.toLocaleLowerCase().includes(searchQuote.toLocaleLowerCase()))
    .map((eachQuote, index) => (
    <li key={index} className='li'>
      <p>Personaje: {eachQuote.character}</p>
      <p>Frase: {eachQuote.quote}</p>
    </li>
  ))
};
  /* HTML */
  return (
    <div className="page">
      {/* header */}
      <header>
        <h1>Frases de Friends</h1>
      </header>
      {/* main filter*/}
      <main>
      <form>
          <fieldset>
            <legend>Filtrar por frase</legend>
            <input
              name="search"
              placeholder="Filtrar por frase"
              onInput={handleFilterQuote}
              value={searchQuote}
              />
          </fieldset>
          <fieldset>
            <legend>Filtrar por personaje</legend>
              <select
                id="character"
                onChange={handleFilterCharacter}
                >
                <option value="all">Todos</option>
                <option value="Joey">Joey</option>
                <option value="Rachel">Rachel</option>
                <option value="Chandler">Chandler</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Ross">Ross</option>
                <option value="Monica">Monica</option>
              </select>
          </fieldset>
        </form>
        {/*phrases list */}
        <section>
          <ul className='ul'>{renderList()}</ul>
        </section>
      </main>
    </div>
  );
}

export default App;

