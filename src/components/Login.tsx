import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, {AxiosError} from 'axios'
import { LoginInterface, UserSessionInterface } from '../Interfaces/AuthInterfaces'
import { Interface } from 'readline'

export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginInterface>({
    password: "",
    email: "",
  })

  function handleChange(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/login', formData)
      const session: UserSessionInterface = {
        user_id: data.user_id,
        token: data.token,
      }
      console.log('SESSION', session)
      localStorage.setItem('session', JSON.stringify(session))
      navigate('/anime')
    } catch (err: AxiosError | any) {
      console.log(err.response.data)
    }
  }

  return <div className="section">
    <div className="container-login">
    <p className="text has-text-danger is-size-3">Anime Cue</p>
    <br/>
      <form onSubmit={handleSubmit}>
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
          </div>
        </div>
        <button className="button is-info">Submit</button>
      </form>
    </div>
  </div>
}