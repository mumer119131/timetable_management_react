import './App.css';
import Header from './Components/Header';
import Schedules from './Components/Schedules/Schedules'
import Dashboard from './Components/Dashboard/Dashboard'
import Rooms from './Components/Rooms/Rooms'
import Classes from './Components/Classes/Classes'
import Search from './Components/Search'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { createContext, useState } from 'react';
import generateSlots from './Adapters/SlotsAdapter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Components/Loading/Loading';


const SlotsContext = createContext()
const LoadingContext = createContext()
function App() {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <>
      <BrowserRouter>
          <Header />
          <LoadingContext.Provider value={isLoading}>
            <Loading />
          </LoadingContext.Provider>
          <ToastContainer />
        <Routes>
          <Route path='/' element={
            <LoadingContext.Provider value={setIsLoading}>
              <SlotsContext.Provider value={generateSlots()}>
                <Dashboard />
              </SlotsContext.Provider>
            </LoadingContext.Provider>
          } />
          <Route path='/rooms' element={
            <LoadingContext.Provider value={setIsLoading}>
              <Rooms />
            </LoadingContext.Provider>
          } />
          <Route path='/classes' element={
            <LoadingContext.Provider value={setIsLoading}>
              <Classes />
            </LoadingContext.Provider>
          } />
          <Route path='/search' element={<Search />} />
          <Route path='/schedule' element={
            <LoadingContext.Provider value={setIsLoading}>
              <SlotsContext.Provider value={generateSlots()}> 
              <Schedules />
            </SlotsContext.Provider>
            </LoadingContext.Provider>
              } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
export {SlotsContext, LoadingContext}
