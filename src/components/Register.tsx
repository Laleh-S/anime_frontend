import axios, { AxiosError } from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterInterface } from '../Interfaces/AuthInterfaces'

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
      await axios.post('/api/register', formData)
      // ! Navigate to the /login page. 
      navigate('/login')

    } catch (err: AxiosError | any) {
      // ! Print out the response from the backend if there's an error
      console.log(err.response.data)

      setErrors(err.response.data.errors)
    }
  }

  console.log(errors)

  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'username'} 
              // ! Adding these 2 fields means your component is 'controlled'. This is good practice!
              value={formData.username}
              onChange={handleChange}
            />
            {/* // ! Really nice custom error messages */}
            {errors.username && <small className="has-text-danger">{errors.username}</small>}
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'email'}
              value={formData.email}
              onChange={handleChange}
            />
            {/* // ! Really nice custom error messages */}
            {errors.email && <small className="has-text-danger">{errors.email}</small>}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'password'}
              value={formData.password}
              onChange={handleChange}
            />
            {/* // ! Really nice custom error messages */}
            {errors.password && <small className="has-text-danger">{errors.password}</small>}
          </div>
        </div>
        <div className="field">
          <label className="label">Confirm password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'passwordConfirmation'}
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            {/* // ! Really nice custom error messages */}
            {errors.passwordConfirmation && <small className="has-text-danger">{errors.passwordConfirmation}</small>}
          </div>
        </div>
        <button className="button is-info">Submit</button>
      </form>
    </div>
  </div>
}