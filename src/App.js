import './App.css';
import { publicRouter } from './routes';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
function App() {
  return (
      <Router>
        <Routes>
          {
            publicRouter.map((route, index) => {
              const Page = route.component;
              const path = route.path;
              return (
                <Route path={path} element={<Page />} />
              )
            })
          }
        </Routes>
      </Router>
  );
}

export default App;
