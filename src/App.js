import React from "react";
import Layout from "./Components/Layout";
import './assets/css/page.css'
import './assets/css/Responsive.css'
// ..
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout></Layout>
    </Router>
  );
}

export default App;
