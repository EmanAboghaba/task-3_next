import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
export default function Notfound() {
  return (
    <div>
      <Container className="text-center mt-5">
        <Row>
          <Col>
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3">Page Not Found</h2>
            <p className="text-muted mb-4">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
