'use client'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr'
import { IBlog } from '@/types/backend';

interface IProps {
    showUpdateModal: boolean;
    setShowUpdateModal: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (blog: IBlog | null) => void;
}

function UpdateModal({ showUpdateModal, setShowUpdateModal, blog, setBlog }: IProps) {

  const handleClose = () => {
    setBlog(null)
    setId(0)
    setTitle("")
    setContent("")
    setAuthor("")
    setShowUpdateModal(false)
  }
  const handleShow = () => setShowUpdateModal(true);

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    if (blog) {
      setId(blog.id)
      setTitle(blog.title)
      setContent(blog.content)
      setAuthor(blog.author)
    }
    
  }, [blog])

  function handleSubmit() {
    if (!title || !author || !content) {
        toast.error('Please fill all!')
        return;
    }
    fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, content })
    }).then(res => res.json())
    .then(data => {
        if(data) {
            toast.success("Update blog success!")
            handleClose()
            mutate("http://localhost:8000/blogs")
        }
    })

  }

  return (
    <>
      <Modal
        show={showUpdateModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        data-bs-theme="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Content" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Author" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleSubmit()}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;