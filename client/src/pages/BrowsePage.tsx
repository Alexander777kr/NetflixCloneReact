import BillBoard from '../components/BillBoard';
import NavBar from '../components/NavBar';
import MovieList from '../components/MovieList';
import useMoviesList from '../hooks/useMoviesList';

export default function BrowsePage() {
  const { data, loading, error } = useMoviesList();

  console.log({ data, loading, error });

  return (
    <div>
      <NavBar />
      <BillBoard />
      <div className="pb-5">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  );
}
