/* SECCIÓN DE IMPORT */
import './styles/App.scss';
import sofa from './img/friends-logo.png'
// import phrases from '../data/phrases.json';
import { useEffect, useState } from 'react';
/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [allData, setAllData] = useState([]);
  const [searchQuote, setSearchQuote] = useState('');//búsqueda por cita
  const [filterCharacter, setFilterCharacter] = useState('all');//filtro por personaje
  const [newQuote, setNewQuote] = useState({ //nueva frase + personaje
    quote: '',
    character: '',
  });

  useEffect(() => {
    fetch ('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then(response => response.json())
      .then(data => {
        setAllData(data);
      });
    }, []);

      /* FUNCIONES HANDLER */
  const handleFilterQuote = (ev) => {
      setSearchQuote(ev.target.value);
    };

  const handleFilterCharacter = (ev) => {
    ev.preventDefault();
    setFilterCharacter(ev.target.value);
  };

  const handleNewQuote = (ev) => {
    setNewQuote({...newQuote, [ev.target.id] : ev.target.value})
  };

  const handleClick = (ev) => {
    ev.preventDefault();
      if (newQuote.quote !== '' && newQuote.character !== ''){
        setAllData([...allData, newQuote]);//quédate con lo q ya tienes y añade newQuote
        setNewQuote ({quote: "", character: "",});//limpia los inputs
    }
  }

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderList = () => {
    return allData
    .filter((eachQuote) => {
      if(filterCharacter === 'all'){
        return true;
      }else if (eachQuote.character.toLocaleLowerCase().includes(filterCharacter.toLocaleLowerCase())) {
        return true;
      }
    })
    .filter((eachQuote) => eachQuote.quote.toLocaleLowerCase().includes(searchQuote.toLocaleLowerCase()))
    .map((eachQuote, index) => (
      <li key={index} className='li'>
        <p className='quote'>Personaje: {eachQuote.character}</p>
        <p>Frase: <p>{eachQuote.quote}</p></p>
      </li>
    ))
  };
  /* HTML */
  return (
    <div>
      {/* header */}
      <header className='header'>
        <div className='div-img-header'>
          <img src={sofa} alt="Logo de la serie"        className='img-header'/>
        </div>
        <h1 className='title'>Busca tus frases de Friends favoritas</h1>
      </header>
      {/* main filter*/}
      <main>
      <form className='filter-form'>
          <fieldset className='fieldset'>
            <legend className='legend'>Filtra por frase</legend>
            <label htmlFor="quote">
            <input
            className='input'
              name="search"
              id='quote'
              placeholder="Filtrar por frase"
              onInput={handleFilterQuote}
              value={searchQuote}
              />
            </label>
          </fieldset>
          <fieldset className='fieldset'>
            <legend className='legend'>Filtra por personaje</legend>
            <label htmlFor="character">
              <select
              className='select'
                id="character"
                onChange={handleFilterCharacter}
                value={filterCharacter}>
                <option value="all">Todos</option>
                <option value="Joey">Joey</option>
                <option value="Rachel">Rachel</option>
                <option value="Chandler">Chandler</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Ross">Ross</option>
                <option value="Monica">Monica</option>
              </select>
            </label>
          </fieldset>
        </form>

        {/* new phrase */}
        <form className='add-phrase' >
          <h2 className='add-title'>Añade una nueva frase</h2>
            <input
            className='input'
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onInput={handleNewQuote}
            value={newQuote.character}
            />
          <input
          className='input'
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            onInput={handleNewQuote}
            value={newQuote.quote}
            />
          <input
          className='add-btn'
            type="submit"
            value="Añadir una nueva frase"
            onClick={handleClick}
            />
        </form>
        {/*phrases list */}
        <section className='phrases-section'>
          <ul className='ul'>{renderList()}</ul>
        </section>
      </main>
      <footer class="footer">
                {/* LOGO */}
                <p
                    class= "footer-logo" >&#8826; MaraGil &#x2571;&#x227B;</p>
                {/* Social nerworks */}
                <ul class="footer-ul">
                    <li class="footer-items">
                        <a  href="https://github.com/maragil"
                            target="_blank"
                            class="footer-icon">
                            <i class="fab fa-github"></i>
                        </a>
                        <a  href="https://www.linkedin.com/in/maria-araujo-gil84/"
                            target="_blank"
                            class="footer-icon">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a  href="http://"
                            target="_blank"
                            class="footer-icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </li>
                </ul>

        </footer>
    </div>
  );
}

export default App;

