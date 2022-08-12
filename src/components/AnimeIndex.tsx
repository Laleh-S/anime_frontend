
import React from 'react'
import { Link } from 'react-router-dom'
import { AnimeInterface } from '../Interfaces/AnimeInterface'

function AnimeIndex() {
  const [anime, setAnime] = React.useState < Array < AnimeInterface >> ([])

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/animes')
      const json = await res.json()
      console.log(json)
      setAnime(json)
    }
    getData()
  }, [])
  console.log('ANIME', anime)
  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {anime.map((anime, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/anime/${anime.id}`}>
              <div className="card has-background-">
                <div className="card-content is-4">
                  <div className="media">
                    <div className="media-content">
                      <p className="title4 has-text-weight-semi-bold has-text-centered has-text-dark is-5">{anime.title}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={anime.image} alt={anime.title} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </div>
  </section>
}

export default AnimeIndex