import React from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Container>
      <h1 className="text-center">4Mation Twitter Demo</h1>
      <ListGroup className="text-center">
        <ListGroupItem><Link to="/search-twitter">Get tweet for a particular user</Link></ListGroupItem>
        <ListGroupItem><Link to="/post-tweet">Post a tweet</Link></ListGroupItem>
        <ListGroupItem><Link to="/search-tweets">Search and like a tweet by keyword</Link></ListGroupItem>
      </ListGroup>
    </Container>
  );
}