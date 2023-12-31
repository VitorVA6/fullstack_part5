import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle} className='blog'>
      <span>{blog.title} {blog.author}<button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button></span>
      <div style={{ display: show ? '' : 'none' }} className='blog-togglable'>
        <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
        <p>
          likes {blog.likes}
          <button
            className='like-button'
            onClick={() => handleUpdate({ ...blog, user: blog.user.id, likes: blog.likes+1 })}
          >
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {
          user.username === blog.user.username &&
          <button
            onClick={() => handleDelete(blog)}
            className='remove-button'
          >remove</button>
        }
      </div>
    </div>
  )
}

export default Blog