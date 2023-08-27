'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr'

interface IProps {
    showCreateModal: boolean;
    setShowCreateModal: (value: boolean) => void;
}

function CreateModal({ showCreateModal, setShowCreateModal }: IProps) {

  const handleClose = () => {
    setTitle("")
    setContent("")
    setAuthor("")
    setShowCreateModal(false)
  }
  const handleShow = () => setShowCreateModal(true);

  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [content, setContent] = useState<string>("")

  function handleSubmit() {
    if (!title || !author || !content) {
        toast.error('Please fill all!')
        return;
    }
    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, content })
    }).then(res => res.json())
    .then(data => {
        if(data) {
            toast.success("Add new blog success!")
            handleClose()
            mutate("http://localhost:8000/blogs")
        }
    })

  }

  return (
    <>
      <Modal
        show={showCreateModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        data-bs-theme="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
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
          <Button variant="success" onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;