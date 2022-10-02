import './App.css';
import Header from './Components/Header';
import Schedule from './Components/Schedule'
import Dashboard from './Components/Dashboard/Dashboard'
import Rooms from './Components/Rooms'
import Classes from './Components/Classes'
import Search from './Components/Search'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { createContext } from 'react';
import generateSlots from './Adapters/SlotsAdapter';

const SlotsContext = createContext()

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={
            <SlotsContext.Provider value={generateSlots()}>
              <Dashboard />
            </SlotsContext.Provider>
          } />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/classes' element={<Classes />} />
          <Route path='/search' element={<Search />} />
          <Route path='/addSchedule' element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
export {SlotsContext}
