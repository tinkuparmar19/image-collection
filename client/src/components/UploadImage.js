import React, { useEffect, useState } from 'react'
import { Button, Form, Card, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function UploadImage() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    useEffect(() => {
        if (url) {
            fetch('/upload', {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                    } else {
                        console.log('posted successfully')
                        history.push('/')
                    }
                }).catch(e => {
                    console.log(e)
                })
        }
    }, [url])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'tinku_dobby')
        data.append('cloud_name', 'panther123')
        fetch('https://api.cloudinary.com/v1_1/panther123/image/upload', {
            method: 'post',
            body: data
        }).then(res => res.json())
            .then(data => {
                setUrl(data.url)
            }).catch(e => {
                console.log(e)
            })
    }

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Enter Image Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required />
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} placeholder="upload image" required />
                            </Form.Group>
                            <Button variant="primary" size="lg" block type="submit">
                                Submit
                    </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default UploadImage
