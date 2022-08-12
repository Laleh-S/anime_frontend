
import Select, { GroupBase } from 'react-select'
import React, { SyntheticEvent, useState , useEffect } from "react"

import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BasicAnimeInterface } from "../Interfaces/AnimeInterface"
import { getToken } from "../lib/auth"

function CreateAnime() {

  const navigate = useNavigate()
  
  const [formData, updateFormData] = useState<BasicAnimeInterface>({
    title: '',
    original_title: '',
    director: '',
    producer: '',
    release_date: '',
    description: '',
    image: '',
  })

  
  function handleChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement
    const value = input.name === 'release_date' ? parseInt(input.value) : input.value
    console.log(input.name, value)
    updateFormData({ 
      ...formData, 
      [input.name]: value,
    })
  }

    // Will call the fetchImage function & take user back to images
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    
    let mutableFormData = formData
    console.log('FORM DATA', formData)
    try {
      const { data } = await axios.post(
        '/api/animes', 
        mutableFormData,
        {
        headers: { 
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        }
      )
      console.log(data._id)
      console.log('RECEIVED DATA', data)
      if (data.errors !== undefined) {
        // TODO: display errors
      } else {
        navigate(`/anime/${data.id}`)
      }
    } catch (err: any) {
      console.log(err.response.data)
    }
  }

  return (
    
    <section className="section-create">
      <div className="container">
        <form onSubmit={handleSubmit}>
          {['Title', 'Original_title', 'Director', 'Producer', 'Release_date', 'Image'].map((field) => {
            return <div key={field} className="field">
              <label className="label">
                {field.replace("_", " ")}
              </label>
              <div>
                <div className="control">
                  <input
                    className="input "
                    type="text"
                    value={formData[field as keyof BasicAnimeInterface]}
                    onChange={handleChange}
                    name={field}
                  />
                </div>  
              </div>   
            </div>    
          })}
            <div className="text has-text-weight-bold">
              <p> Description</p>
              <textarea
              className="textarea mt-3 has-text-weight-bold"
              placeholder="Describe your anime"
              name="description"
              onChange={handleChange}
              value={formData.description}
              />
            </div>
            <button className="button mt-5 is-info">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default CreateAnime