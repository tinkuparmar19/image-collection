import React, { useState } from 'react'
import { Button, Card, Container, Form, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            // mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    setError(data.error)
                } else {
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    history.push('/')
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
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleSubmit}>
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
                            <p className="mt-2">Don't have account <Link to='/signup'>signup</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Login
