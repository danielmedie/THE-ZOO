import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/nav/nav';
import { Footer } from './components/footer/footer';
import './App.scss';

function App() {
  const location = useLocation();
  const showHeroText = location.pathname === '/';

  return (
    <div className="App">
      <header>
        <Navigation></Navigation>
      </header>
      {showHeroText && <p className='hero__text'>THE ZOO</p>}
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
