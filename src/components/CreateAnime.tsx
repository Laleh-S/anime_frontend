
import Select, { GroupBase } from 'react-select'
import React, { SyntheticEvent, useState , useEffect } from "react"

import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BasicAnimeInterface } from "../Interfaces/AnimeInterface"
import { getToken } from "../lib/auth"

function CreateAnime() {

  
  const navigate = useNavigate()
  
  const [imageDisplay, updateImageDisplay] = useState("")
  const [button, updateButton] = useState(false)
  const [inputValue, updateInputValue] = useState('')
  const [formData, updateFormData] = useState<BasicAnimeInterface>({
    title: '',
    original_title: '',
    director: '',
    producer: '',
    release_date: '',
    description: '',
    image: '',
    // url:
  })


  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dy4gabnho', 
        uploadPreset: 'zosc7ygt', 
        cropping: true
      },

      (err, result) => {
        if (result.event != 'success') {
          return
        } 
        updateFormData({
          ...formData,
          // url: result.info.secure_url
          
        })
      }
    ).open()
  }

  function handleImageChange(e: any) {
    updateInputValue(e.target.value)
    updateFormData({
      ...formData,

    })
  }
  
  function handleChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement
    const value = input.name === 'release_date' ? parseInt(input.value) : input.value
    updateFormData({ 
      ...formData, 
      [input.name]: value,
    })
  }

    // Will call the fetchImage function & take user back to images
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    
    try {
      const { data } = await axios.post('/api/anime', formData)
      console.log(data)
      updateButton(!button)
    } catch (err) {
      console.log(err)
    }


    let mutableFormData = formData
    mutableFormData['image'] = imageDisplay
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
    
    <section className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>

          {['title', 'original_title', 'director', 'producer', 'release_date', 'image'].map((field) => {
            return <div key={field} className="field">
              <label className="label">
                {field.replace("_", " ").toUpperCase()}
              </label>
              <div>
                <div className="control">
                  <input
                    className="input"
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
          <div>

      {button === true ?
        <div className="container">
          <button className="button" onClick={() => updateButton(!button)}>Back</button>
          <button className="button" onClick={handleUpload}>Click to upload an image</button>
          {/* <textarea
            className="textarea is-primary"
            placeholder='Your caption'
            onChange={handleChange}
            value={inputValue} /> */}
          <button className="button" onClick={handleSubmit}>Submit and return</button>
        </div>
        :
        <div>
          <button className="button" onClick={() => updateButton(!button)}>Click here to post a image</button>
        </div>
        }
    </div>
                      
          <button className="button mt-5 is-info">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default CreateAnime