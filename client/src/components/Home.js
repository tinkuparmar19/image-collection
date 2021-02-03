import React, { useEffect, useState } from 'react'
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function Home() {

    const [pics, setPics] = useState([])
    const [query, setQuery] = useState('')
    const history = useHistory()

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                setPics(result.mypost)
            })
    }, [])

    const result = pics.filter(pic => {
        return pic.title.toLowerCase().includes(query.trim().toLowerCase())
    })

    const showresult = result ? result : pics

    const handleClick = () => {
        localStorage.clear()
        history.push('/login')
    }

    return (
        <Container
            className="d-flex flex-column justify-content-space-around"
        >
            <Row className="mt-5 mb-5">
                <Col md={9}>
                    <Form.Control
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="search photos by title"
                        style={{ maxWidth: '600px' }}
                    />
                </Col>
                <Col md={2}>
                    <Link to='/upload'>
                        <Button variant="primary">
                            Upload Image
                        </Button>
                    </Link>
                </Col>
                <Col md={1}>
                    <Link>
                        <Button variant="primary" onClick={handleClick}>
                            LogOut
                        </Button>
                    </Link>
                </Col>
            </Row>
            <div className="d-flex justify-content-space-around flex-wrap">
                {
                    showresult.map(pic => {
                        return (
                            <div className="m-4" key={pic.title}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={pic.photo} />
                                    <Card.Body>
                                        <Card.Title>{pic.title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </Container>
    )
}

export default Home
