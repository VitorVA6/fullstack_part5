import React, { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const create = (event) => {
    event.preventDefault()
    handleCreate({ title, url, author })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <form onSubmit={create}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm