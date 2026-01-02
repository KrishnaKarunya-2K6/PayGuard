import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VendorUpload from './pages/VendorUpload';
import AdminApproval from './pages/AdminApproval';
import { RoleProvider } from './context/RoleContext';
import './App.css';

function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<VendorUpload />} />
            <Route path="/admin" element={<AdminApproval />} />
          </Route>
        </Routes>
      </Router>
    </RoleProvider>
  );
}

export default App;
