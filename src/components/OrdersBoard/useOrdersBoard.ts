import { useCallback, useState } from 'react';
import { Order } from '../../types/Order';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { OrdersBoardProps } from './types/OrdersBoardProps';

export function useOrdersBoard(
  onCancelOrder: OrdersBoardProps['onCancelOrder'],
  onChangeOrderStatus: OrdersBoardProps['onChangeOrderStatus']
) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }, []);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status =
      selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    await new Promise((resolve) => setTimeout(() => resolve(''), 1000));

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
    );
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return {
    isModalVisible,
    selectedOrder,
    handleCloseModal,
    handleCancelOder,
    isLoading,
    handleChangeOrderStatus,
    handleOpenModal,
  };
}
