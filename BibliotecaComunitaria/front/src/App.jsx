import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CadastrarLivro from "./CadastrarLivro";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar-livro" element={<CadastrarLivro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;