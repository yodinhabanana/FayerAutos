import { useEffect } from "react";
import { getProducts } from "./services/productService";

function App() {
    useEffect(() => {
        getProducts()
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }, []);

    return <h1>FayerAutos</h1>;
}

export default App;