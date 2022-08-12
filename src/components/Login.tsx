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
      localStorage.setItem('session', JSON.stringify(session))
      navigate('/anime')
    } catch (err: AxiosError | any) {
      console.log(err.response.data)
    }
  }

  return <div className="section-login">
    <div className="container-login">
    <p className="text has-text-danger is-size-4">Anime Cue</p>
    <br/>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-right">
            <input
              className="input is-rounded"
              type="email"
              name={'email'}

              value={formData.email}
              onChange={handleChange}
            /> 
            <span className="icon is-right">
                <i className="fa fa-envelope"></i>
            </span>          
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
          </div>
        </div>
        <button className="button is-info is-rounded ">Login</button>
        <div className="register mt-2 pt-3">
        <h3 className=" has-text-weight-bold ">New user? <a href="register" className="has-text-weight-bold has-text-info ">register here</a></h3>
      </div>
      </form>
    </div>

  </div>
}