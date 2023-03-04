import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/nav/nav';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <header>
        <Navigation></Navigation>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
