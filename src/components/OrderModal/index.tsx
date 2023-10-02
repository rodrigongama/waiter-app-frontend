import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { orderInformation } from '../../enums/orderInformation';
import { formatCurrency } from '../../utils/formatCurrency';

import { OrderModalProps } from './types/OrderModalProps';
import * as Styles from './styles';

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) return null;

  const total = order.products.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  return (
    <Styles.Overlay>
      <Styles.ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Fechar" />
          </button>
        </header>

        <Styles.StatusContainer>
          <small>Status do Pedido</small>

          <div>
            <span>{orderInformation[order.status].icon}</span>
            <strong>{orderInformation[order.status].text}</strong>
          </div>
        </Styles.StatusContainer>

        <Styles.OrderDetails>
          <strong>Itens</strong>

          {order.products.map(({ _id, product, quantity }) => (
            <Styles.OrderItem key={_id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  product.imagePath
                }`}
                alt={product.name}
              />

              <span className="quantity">{quantity}x</span>

              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </div>
            </Styles.OrderItem>
          ))}

          <Styles.OrderTotal>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </Styles.OrderTotal>
        </Styles.OrderDetails>

        <Styles.Actions>
          {order.status !== 'DONE' && (
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING'
                  ? orderInformation.IN_PRODUCTION.icon
                  : orderInformation.DONE.icon}
              </span>

              <strong>
                {order.status === 'WAITING'
                  ? 'Iniciar produção'
                  : 'Concluir pedido'}
              </strong>
            </button>
          )}

          <button
            type="button"
            className="secondary"
            disabled={isLoading}
            onClick={onCancelOrder}
          >
            Cancelar pedido
          </button>
        </Styles.Actions>
      </Styles.ModalBody>
    </Styles.Overlay>
  );
}
