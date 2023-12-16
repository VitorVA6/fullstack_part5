import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const jsonUser = window.localStorage.getItem('user')
    if(jsonUser){
      const user = JSON.parse(jsonUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const sortBlogs = blog => {
    const sortedBlog = blog.sort((a, b) => b.likes - a.likes)
    return sortedBlog
  }

  const showMessage = (type, text) => {
    setMessage({
      type,
      text
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleCreate = async (blog) => {
    try{
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      showMessage('success', `a new blog ${newBlog.title} by ${newBlog.author}`)
    }catch(err){
      showMessage('error', err.response.data.error)
    }
  }

  const handleUpdate = async blog => {
    try{
      const updateBlog = await blogService.update(blog)
      const updaredBlogs = blogs.map(b => b.id === updateBlog.id ? updateBlog : b)
      setBlogs(sortBlogs(updaredBlogs))
      showMessage('success', `you liked blog ${updateBlog.title} by ${updateBlog.author}`)
    }catch(err){
      showMessage('error', err.response.data.error)
    }
  }

  const handleDelete = async blog => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try{
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showMessage('success', 'blog successfully deleted')
      }catch(err){
        console.log(err)
        showMessage('error', err.response.data.error)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    }catch(err){
      console.log(err)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      {
        user === null ?
          <LoginForm
            login={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          /> :
          <>
            <h2>blogs</h2>
            <Notification message={message}/>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel='new blog'>
              <BlogForm handleCreate={handleCreate}/>
            </Togglable>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                user={user}
              />
            )}
          </>
      }
    </div>
  )
}

export default App