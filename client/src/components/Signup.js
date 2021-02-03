import React, { useState } from 'react'
import { Button, Card, Container, Form, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'


function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    setError(data.error)
                } else {
                    console.log(data.message)
                    history.push('/login')
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '400px' }}>
                {error && <Alert variant="danger">
                    {error}
                </Alert>
                }
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Enter Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Enter Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Enter Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                            </Form.Group>
                            <Button variant="primary" size="lg" block type="submit">
                                Submit
                            </Button>
                            <p className="mt-2">Already have account <Link to='/login'>login</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Signup
