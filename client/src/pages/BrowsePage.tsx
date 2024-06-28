import BillBoard from '../components/BillBoard';
import NavBar from '../components/NavBar';
import MovieList from '../components/MovieList';

export default function BrowsePage() {
  return (
    <div>
      <NavBar />
      <BillBoard />
      <div className="pb-5">
        <MovieList />
      </div>
    </div>
  );
}
