
import { NavLink } from 'react-router-dom';
import Logo from '../assets/FintesaIcon.png'; 

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-0"> 
          <img
            className="h-10 w-10 object-contain"
            src={Logo}
            alt="Fintesa logo"
          />
          <h1 className="text-lg sm:text-2xl font-semibold ml-2">
            Fintesa Transactions Dashboard
          </h1>
        </div>

        <nav>
          <NavLink to="/" className="text-sm text-gray-600 hover:text-black">
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
