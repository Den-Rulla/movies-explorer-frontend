import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchErrMessage from '../SearchErrMessage/SearchErrMessage';
import './MoviesCardList.css';

export default function MoviesCardList({
  allMovies,
  savedMovies,
  handleSave,
  handleDelete,
  setSavedMovies,
  isLoading,
  isNotFound
}) {

  return (
  <>
    { isLoading ? (
      <Preloader />
        ) : isNotFound ? (
      <SearchErrMessage
        text={'Ничего не найдено'}/>
        ) : (
    <ul className='movies-card-list'>
     {allMovies &&
        allMovies?.map((movie) => (
          <MoviesCard
            key={movie._id || movie.id}
            savedMovies={savedMovies || allMovies}
            handleDeleteMovie={handleDelete}
            handleSaveMovie={handleSave}
            movie={movie}
            setSavedMovies={setSavedMovies}
            {...movie}
          />
        )
      )}
    </ul>
    )
    }
  </>
  );
}
