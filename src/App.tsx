import "./App.css";
import MyLink from "./helpers/Link";

function App() {
  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-5xl font-bold">Components</h1>
      <ol className="mt-5 w-125 list-decimal">
        <li>
          <MyLink to="/components/music-box">Music Box</MyLink>
        </li>
        <li>
          <MyLink to="/components/stop-watch">Stop Watch</MyLink>
        </li>
        <li>
          <MyLink to="/components/debounced-search">Debounced Search</MyLink>
        </li>
        <li>
          <MyLink to="/components/custom-dropdown">Custom Dropdown</MyLink>
        </li>
      </ol>
    </main>
  );
}

export default App;
