import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
        <div className="App">
            <h1>Infinite SWAPI</h1>
            <InfinitePeople />
            {/* <InfiniteSpecies /> */}
        </div>
    </QueryClientProvider>
  );
}

export default App;
