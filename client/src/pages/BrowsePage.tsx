import BillBoard from '../components/BillBoard';
import NavBar from '../components/NavBar';
import MovieList from '../components/MovieList';
import useMoviesList from '../hooks/useMoviesList';
import { useState, useRef, useCallback } from 'react';
import LoadingCards from '../components/LoadingCards';
import { useAppSelector } from '../app/hooks';
import { Navigate } from 'react-router-dom';

export default function BrowsePage() {
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useMoviesList(offset);

  const observer = useRef<null | IntersectionObserver>(null);

  const { user, isLoading } = useAppSelector((state) => state.user.value);

  console.log({ isLoading, user });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offset + 12);
          console.log('intersecting');
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  if (error === 'Unauthorized; no plan') {
    return <Navigate to="/plans" />;
  }
  return (
    <div>
      <NavBar />
      <BillBoard />
      <div className="pb-5">
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} lastElementRef={lastElementRef} />}
        {loading ? <LoadingCards /> : null}
      </div>
    </div>
  );
}
