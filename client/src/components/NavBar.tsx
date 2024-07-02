import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';

const tabs = [
  'Home',
  'Series',
  'Films',
  'New & Popular',
  'My List',
  'Browse by languages',
];

export default function NavBar() {
  const { user, isLoading } = useAppSelector((state) => state.user.value);
  const [showBackground, setShowBackground] = useState(false);
  const { logout } = useAuth();
  const addBackgroundWithScroll = () => {
    if (window.scrollY > 700) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', addBackgroundWithScroll);
    return () => {
      window.removeEventListener('scroll', addBackgroundWithScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? 'bg-black bg-opacity-90' : null
        }`}
      >
        <img
          className="h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="logo"
        />
        <div className="flex gap-7 ml-8 mr-auto">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
        {user && !isLoading && (
          <div>
            <div className="text-white hover:text-gray-300 cursor-pointer ml-auto">
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
