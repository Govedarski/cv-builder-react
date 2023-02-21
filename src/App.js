import me from './me.jpg';
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={me} className="App-logo" alt="logo" />
          <p>
            Аз съм гений!
          </p>
        </header>
      </div>
  );
}

export default App;
