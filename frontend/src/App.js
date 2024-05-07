import React from 'react';
import ProvidersList from './components/ProvidersList.jsx';
import AddProviderForm from './components/AddProviderForm.jsx';

function App() {
  return (
    <div className="App">
      <h1>Allara Scheduling System</h1>
      <ProvidersList />
      <AddProviderForm />
    </div>
  );
}

export default App;
