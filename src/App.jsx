import "./App.css";
import EditIntern from "./EditIntern";
import InternList from "./InternList";
import { Routes, Route } from "react-router-dom";
import { ReactComponent as Logo } from './assets/icons/logo.svg';


function App() {
  return (
    <div className="App">
        <Logo className="logo"/>
        <Routes>
            <Route path="/interns/:id" exact element={<EditIntern />} />
            <Route path="/" element={<InternList />} />
        </Routes>
    </div>
  );
}

export default App;
