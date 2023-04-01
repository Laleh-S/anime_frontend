import axios, { AxiosError } from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterInterface } from '../Interfaces/AuthInterfaces'
import { baseUrl } from '../config.js'


export default function Register() {
  // ! Using react router to navigate
  const navigate = useNavigate()

  // ! Put our form fields in state.
  const [formData, setFormData] = useState<RegisterInterface>({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  })

  // ! Errors
  const [errors, setErrors] = useState<RegisterInterface>({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  })

  function handleChange(e: SyntheticEvent) {
    // ! name: field you've typed in, e.g. the email input
    // ! value: the text that's in that field
    const { name, value } = e.target as HTMLInputElement
    setFormData({
      ...formData, // ! This is whatever the form data was before, all it's fields.
      [name]: value, 
    })
    setErrors({
      ...errors,
      [name]: '',
    })
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    try {
      await axios.post(`${baseUrl}/register`, formData)
      // ! Navigate to the /login page. 
      navigate('/login')

    } catch (err: AxiosError | any) {
      // ! Print out the response from the backend if there's an error
      console.log(err.response.data)

      setErrors(err.response.data.errors)
    }
  }

  console.log(errors)

  return <div className="section-register">
    <div className="container">
    <div className="column is-centered">

    </div>
      <form className="form" onSubmit={handleSubmit}>
      <p className="text has-text-danger is-size-4">Anime Cue</p>
    <br/>
      
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-right">
            <input
              className="input is-rounded"
              type="text"
              name={'username'}
              // ! Adding these 2 fields means your component is 'controlled'. This is good practice!
              value={formData.username}
              onChange={handleChange}
            /> 
            <span className="icon is-right">
                <i className="fa fa-user"></i>
            </span> 
            {errors.username && <small className="has-text-danger">{errors.username}</small>}         
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-right">
            <input
              className="input is-rounded"
              type="text"
              name={'email'}
              // ! Adding these 2 fields means your component is 'controlled'. This is good practice!
              value={formData.email}
              onChange={handleChange}
            /> 
            <span className="icon is-right">
                <i className="fa fa-envelope"></i>
            </span> 
            {errors.email && <small className="has-text-danger">{errors.email}</small>}         
          </div>
        </div>
        
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-right">
            <input
              className="input is-rounded"
              type="password"
              name={'password'}
              value={formData.password}
              onChange={handleChange}
            />
            <span className="icon is-right">
                <i className="fa fa-lock"></i>
            </span>
            {/* // ! Really nice custom error messages */}
            {errors.password && <small className="has-text-danger">{errors.password}</small>}
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm password</label>
          <div className="control has-icons-right">
            <input
              className="input is-rounded"
              type="password"
              name={'passwordConfirmation'}
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            <span className="icon is-right">
                <i className="fa fa-lock"></i>
            </span>
            {/* // custom error messages */}
            {errors.passwordConfirmation && <small className="has-text-danger">{errors.passwordConfirmation}</small>}
          </div>
        </div>
        <div className="">
          <button className="button is-info is-rounded">Register</button>
        </div>
      </form>
    </div>
  </div>
}