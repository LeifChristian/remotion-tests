import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const TwoWaySlider = () => {
  const [value, setValue] = React.useState([0, 100]);

  const handleSliderChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setValue([min, max]);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form>
            <Form.Group controlId="formTwoWaySlider">
              <Form.Label>Two-Way Slider</Form.Label>
              <Form.Control
                type="range"
                min={0}
                max={100}
                step={1}
                value={`${value[0]},${value[1]}`}
                onChange={handleSliderChange}
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,0.5) ${value[0]}%, rgba(255,0,0,1) ${value[0]}%, rgba(255,0,0,1) ${value[1]}%, rgba(255,255,255,0.5) ${value[1]}%)`,
                }}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TwoWaySlider;
