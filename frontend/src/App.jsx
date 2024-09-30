import './App.css';
import SideBar from './Components/SideBar/SideBar';

function App() {
  localStorage.setItem('activeTab',"1")
  return (
    <div className="App">
      
      <SideBar />
    
    </div>
  );
}

export default App;
