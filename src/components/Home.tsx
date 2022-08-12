

function Home() {
  return (
    <section className="home pt-4">
      <div className="section has-background-danger">
        <div className="columns">
          <div className="column is-half ">
            <figure className="image is-5by4">
              <img src={require("../assets/home_wallpaper.jpg")} />
            </figure>
          </div>
          <div className="column is-half mt-5 pt-5">
            <h4 className="title is-size-3 has-text-dark is-is-succes mt-5 pt-5">
              Welcome to Anime Cue... <br/>
              <br/>
              A place where anime fans of all levels come to
              discuss and share their love for the genre!
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home



