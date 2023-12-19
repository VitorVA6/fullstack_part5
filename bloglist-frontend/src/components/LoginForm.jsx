import React from 'react'

const LoginForm = ({ login, username, setUsername, password, setPassword }) => {

  return (
    <div>
      <form onSubmit={login}>
        <h2>log in to application</h2>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm