import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '../../data/dummy-products';
import { useCart } from '../../context/CartContext';
import { Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string; }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = DUMMY_PRODUCTS.find(p => p.id === id);

  if (!product) {
    navigate('/');
    return null;
  }

  // Les produits (simulés) mais après via API
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <Container className="py-5" style={{ marginTop: '6rem' }}>
      <Row>
        <Col lg={7}>
          <div className="position-relative">
            <img
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="img-fluid"
              style={{
                width: '100%',
                height: '600px',
                objectFit: 'cover',
                borderRadius: '24px'
              }}
            />
            <Button
              className="position-absolute top-50 start-0 translate-middle-y ms-3"
              variant="light"
              style={{ borderRadius: '50%', width: '48px', height: '48px' }}
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              variant="light"
              style={{ borderRadius: '50%', width: '48px', height: '48px' }}
              onClick={() => setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          <div className="d-flex gap-3 mt-4">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '2px solid #2997ff' : 'none'
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </Col>
        <Col lg={5}>
          <div className="sticky-top" style={{ top: '100px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              {product.price.toFixed(2)}€
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              {product.description}
            </p>

            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Truck size={24} className="text-success" />
                <div>
                  <p className="mb-0" style={{ fontWeight: 500 }}>Livraison gratuite</p>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Livraison gratuite à partir de 50€
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Shield size={24} className="text-success" />
                <div>
                  <p className="mb-0" style={{ fontWeight: 500 }}>2 ans de garantie</p>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Tous nos produits sont garantis 2 ans
                  </p>
                </div>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 500 }}>Quantité</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{
                  maxWidth: '100px',
                  backgroundColor: 'var(--secondary-bg)',
                  border: 'none',
                  borderRadius: '12px'
                }}
              />
            </Form.Group>

            <Button
              className="w-100 btn-custom"
              style={{ fontSize: '1.1rem', padding: '1rem' }}
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;