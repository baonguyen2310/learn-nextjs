import { IBlog } from '@/types/backend';
import { Table, Button } from 'react-bootstrap';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface IProps {
  blogs: IBlog[]
}

function AppTable({ blogs }: IProps) {
  const [blog, setBlog] = useState<IBlog | null>(null)

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)

  function handleDeleteBlog(id: number) {
    if (confirm("Delete this blog?")) {
      fetch(`http://localhost:8000/blogs/${id}`,{
        method: 'DELETE'
      }).then(res => res.json())
      .then(data => {
        toast.success("Deleted this blog")
        mutate('http://localhost:8000/blogs')
      })
    }
  }

  return (
    <>
      <div
        className='mb-3'
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button 
          variant='secondary' 
          onClick={() => setShowCreateModal(true)}
        >
          Add new
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            blogs.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>
                    <Link href={`/blogs/${item.id}`} className='btn btn-primary'>View</Link>
                    <Button 
                      variant='warning' 
                      className='mx-3' 
                      onClick={() => {
                        setBlog(item)
                        setShowUpdateModal(true)}
                      }
                    >
                      Edit
                    </Button>
                    <Button 
                      variant='danger'
                      onClick={() => handleDeleteBlog(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <CreateModal 
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
      <UpdateModal 
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
}

export default AppTable;