import { useLocation } from 'react-router-dom';
import RouterConfig from './RouterConfig';
import MusicPlayerBar from './components/Bar/MusicPlayerBar';

const USER_ROUTE_PREFIXES = [
  '/',
  '/artists',
  '/genre',
  '/more-genres',
  '/album',
  '/favourite',
  '/top-track',
  '/history',
];

export default function App() {
  const { pathname } = useLocation();

  const showPlayer = USER_ROUTE_PREFIXES.some(prefix =>
    prefix === '/'
      ? pathname === '/'
      : pathname.startsWith(prefix)
  );

  return (
    <>
      <RouterConfig />
      {showPlayer && <MusicPlayerBar isSidebarOpen={false} />}
    </>
  );
}