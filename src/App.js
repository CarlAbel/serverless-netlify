import "./App.css"

import { useEffect, useState } from "react"

function App() {
  const [token, setToken] = useState(null)
  const [secretMessage, setSecretMessage] = useState("")

  useEffect(() => {
    fetch("/.netlify/functions/super-secret", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSecretMessage(data.message)
      })
  }, [token])

  async function submitHandler(event) {
    event.preventDefault()
    try {
      const response = await fetch("/.netlify/functions/auth", {
        method: "POST",
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      })
      if (response.status === 201) {
        const data = await response.json()
        setToken(data.token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">
            Username:
            <input name="username" type="username" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input name="password" type="password" />
          </label>
        </div>
        <button>Log in</button>
      </form>
      <p>{token ? "Du er logget ind" : "Du er IKKE logget ind"}</p>
      <p>{secretMessage}</p>
    </div>
  )
}

export default App
