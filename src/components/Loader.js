import React from 'react';
import { Container, Row, Spinner } from 'reactstrap';

const Loader = () => (
  <Container fluid className='d-flex'>
    <Row className='justify-content-center align-self-center text-center'>
      <Spinner className='loader' color='primary' />
    </Row>
  </Container>
);

export default Loader;
