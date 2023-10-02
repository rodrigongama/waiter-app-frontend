import { OrderModal } from '../OrderModal';
import { useOrdersBoard } from './useOrdersBoard';

import { OrdersBoardProps } from './types/OrdersBoardProps';
import { Board, OrdersContainer } from './styles';

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrdersBoardProps) {
  const {
    isModalVisible,
    selectedOrder,
    handleCloseModal,
    handleCancelOder,
    isLoading,
    handleChangeOrderStatus,
    handleOpenModal,
  } = useOrdersBoard(onCancelOrder, onChangeOrderStatus);

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
