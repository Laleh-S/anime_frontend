
import Select, { GroupBase } from 'react-select'
import React, { SyntheticEvent, useState , useEffect } from "react"

import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BasicAnimeInterface } from "../Interfaces/AnimeInterface"
import { getToken } from "../lib/auth"

function CreateAnime() {
  const FIELDS_LABELS_MAPPING: Record<string, string> = {
    title: 'Title',
    original_title: 'Original Title',
    director: 'Director',
    producer: 'Producer',
    release_date: 'Release Date',
    description: 'Description',
    image: 'Image',
  }

  const navigate = useNavigate()
  
  const [formData, updateFormData] = useState<BasicAnimeInterface>(() => {
    return Object.fromEntries(Object.keys(FIELDS_LABELS_MAPPING).map((key)=> [key, ''])) as unknown as BasicAnimeInterface
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
        <p className="text has-text-danger is-size-3 pb-5">Anime Cue</p>
          {Object.keys(FIELDS_LABELS_MAPPING).filter((field) => field !== 'description').map((field) => {
            return <div key={field} className="field">
              <label className="form-create">
                {FIELDS_LABELS_MAPPING[field]}
              </label>
              <div>
                <div className="control">
                  <input
                    className="input "
                    type="text"
                    value={formData[field as keyof BasicAnimeInterface]}
                    onChange={handleChange}
                    name={field}
                    // placeholder={field}
                  />
                </div>  
              </div>   
            </div>    
          })}
            <div className="form">
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