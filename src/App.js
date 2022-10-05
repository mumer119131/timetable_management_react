import './App.css';
import Header from './Components/Header';
import Schedules from './Components/Schedules/Schedules'
import Dashboard from './Components/Dashboard/Dashboard'
import Rooms from './Components/Rooms/Rooms'
import Classes from './Components/Classes/Classes'
import Search from './Components/Search'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { createContext } from 'react';
import generateSlots from './Adapters/SlotsAdapter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SlotsContext = createContext()
function App() {
  
  return (
    <>
      <BrowserRouter>
          <Header />
          <ToastContainer />
        <Routes>
          <Route path='/' element={
            <SlotsContext.Provider value={generateSlots()}>
              <Dashboard />
            </SlotsContext.Provider>
          } />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/classes' element={<Classes />} />
          <Route path='/search' element={<Search />} />
          <Route path='/schedule' element={
            <SlotsContext.Provider value={generateSlots()}> 
              <Schedules />
            </SlotsContext.Provider>
              } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
export {SlotsContext}
