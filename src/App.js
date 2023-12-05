import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import CContextProvider from "./utils/CContextProvider";
import Router from "./routes";
import ThemeProvider from "./theme";

function App() {
    return (
        <CContextProvider>
            <ThemeProvider>
                <ScrollToTop />
                <Router />
            </ThemeProvider>
        </CContextProvider>
    );
}

export default App;
