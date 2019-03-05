import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function WordList({ words }) {
  return (
    <ListGroup>
      {words.map((item, index) => {
        const { value, notRendered, found } = item;
        return (
          <ListGroup.Item
            as="li"
            key={index}
            variant={notRendered ? 'warning' : found ? 'dark' : ''}
          >
            {value}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
