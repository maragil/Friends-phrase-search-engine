/* SECCIÓN DE IMPORT */
import '../styles/App.scss';
import phrases from '../data/phrases.json';
import { useState } from 'react';


/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [allData, setAllData] = useState(phrases);
  /* FUNCIONES HANDLER */

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderList = () => {
    return allData
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
        {/*phrases list */}
        <section>
          <ul className='ul'>{renderList()}</ul>
        </section>
      </main>
    </div>
  );
}

export default App;

