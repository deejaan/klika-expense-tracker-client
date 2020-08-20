import React from 'react';
import { Container, Row, Spinner } from 'reactstrap';

const Loader = () => (
  <Container fluid className='d-flex justify-content-center p-1 mr-3'>
    <Row className='justify-content-center align-self-center text-center'>
      <Spinner className='loader' color='primary' />
    </Row>
  </Container>
);

export default Loader;
