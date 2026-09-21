
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import RoutesPlanner from './pages/RoutesPlanner';
import LiveJourney from './pages/LiveJourney';
import Insights from './pages/Insights';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/routes" element={<RoutesPlanner />} />
          <Route path="/live" element={<LiveJourney />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
