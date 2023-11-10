class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
      return fetch(this._baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});
