import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TransactionsInfo from  './pages/TransactionsInfo';

export default function App(){
  return(
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/transaction/:id" element={<TransactionsInfo/>}/>
        </Routes>
      </main>
    </div>
  )
}