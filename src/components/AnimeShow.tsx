import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AnimeInterface } from "../Interfaces/AnimeInterface"
import { isCreator, getLoggedInUserId, getToken } from '../lib/auth'
import axios from 'axios'

function AnimeShow() {
  const [anime, setAnime] = React.useState<AnimeInterface | undefined>(undefined)
  const [commentContent, setCommentContent] = React.useState('')
  const { animeId } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    loadAnime()
  }, [animeId])

  async function loadAnime() {
    await fetch(`/api/animes/${animeId}`)
    .then(resp => resp.json())
    .then((data: AnimeInterface) => {
      setAnime(data)
    })
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/animes/${animeId}`, { // First argument is the URL
        // With Delete and Get you can't post information, so there are only two arguments
        headers: { Authorization: `Bearer ${getToken()}` }, // Second argument is any headers or options.
      })
      navigate('/anime')
    } catch (e) {
      console.log(e)
    }
  }

  async function handleComment() {
    try {
      const { data } = await axios.post(
        `/api/animes/${animeId}/comments`, // First argument is the URL
        // Below we are going to take the text inside of the comentContent and stick it in the content.
        { content: commentContent }, // IMPORTANT: When posting in axios the second argument is an object the thing you are posting. 
        {
          headers: { Authorization: `Bearer ${getToken()}` }, // Third argument is any headers or options.
        }
      )
      loadAnime()
    } catch (e) {
      console.log(e)
    }
  }
  console.log(anime)


  return (
    <section className="section">
      <div className="container">
        {anime ? (
          <div>
            <h3 className="title has-text-centered">{anime.title}</h3>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img src={anime.image} alt={anime.title} />
                  <br />
                </figure>
                {/* // ? Only show the button if the anime was made by the user. */}
                {/* Here we're calling it to check if the anime user ID matches the logged in user ID and if it does you showed the button it doesn't you don't show them.*/}
                {/* You can do that to show whatever features you want to disable for users who are not the logged in user, you can do it like that. */}
                {isCreator(anime.user.id) && <button 
                  className="button is-danger"
                  onClick={handleDelete}
                >
                  Delete Anime
                </button>}
              </div>
              <div className="column is-half">
                <h4 className="title is-4">
                  {/* <span role="img" aria-label="plate">
                  </span>{" "} */}
                  Original title
                </h4>
                <p>{anime.original_title}</p>
                <hr />
                <h4 className="title is-4">
                  <span role="img" aria-label="globe">
                  </span>{" "}
                  Director
                </h4>
                <p>{anime.director}</p>
                <hr />

                <h4 className="title is-4">
                  <span role="img" aria-label="globe">
                  </span>{" "}
                  Producer
                </h4>
                <p>{anime.producer}</p>
                <hr />
                <h4 className="title is-4">
                  <span role="img" aria-label="globe">
                  </span>{" "}
                  Release Date
                </h4>
                <p>{anime.release_date}</p>
                <hr />

                <h4 className="title is-4">
                  <span role="img" aria-label="globe">
                  </span>{" "}
                  Description
                </h4>
                <p>{anime.description}</p>
                <br />
                <p className="creator is-success is-success">Uploaded by: {anime.user.username}</p>

                <hr />
                
  

                <br />
                {anime.comments && anime.comments.map(comment => {
                  return <article key={comment.id} className="media">
                    <div className="media-content">
                      <div className="subtitle is-6 is-success">
                        <p className="">
                          
                          {comment.user.username} <span className="date"> date: </span> 
                          {comment.created_at.split("T")[0].split("-").slice(0).reverse().join(" ")}  
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </article>
                })}
                
                {getLoggedInUserId() && <article className="media"> 
                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea
                          className="textarea"
                          placeholder="Write your comment.."
                          // ? Set the comment's content to be what's in the input textarea.
                          onChange={(event) => setCommentContent(event.target.value)}
                        >
                        </textarea>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button
                          className="button is-info"
                          onClick={handleComment}
                        >
                          Suubmit
                        </button>
                      </p>
                    </div>
                  </div>
                </article>}

              </div>
            </div>
          </div>
        ) : (
          <p>...loading</p>
        )}
      </div>
    </section>
  )
}

export default AnimeShow
