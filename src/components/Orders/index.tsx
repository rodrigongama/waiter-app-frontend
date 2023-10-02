import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import { OrdersBoard } from '../OrdersBoard';

import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { orderInformation } from '../../enums/orderInformation';

import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    );
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  }

  useEffect(() => {
    api
      .get('/orders')
      .then(({ data }) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_BACKEND_URL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (newOrder) => {
      console.log(newOrder);
      setOrders((prevState) => prevState.concat(newOrder));
    });
  }, []);

  return (
    <Container>
      <OrdersBoard
        icon={orderInformation.WAITING.icon}
        title={orderInformation.WAITING.text}
        orders={orders.filter(({ status }) => status === 'WAITING')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon={orderInformation.IN_PRODUCTION.icon}
        title={orderInformation.IN_PRODUCTION.text}
        orders={orders.filter(({ status }) => status === 'IN_PRODUCTION')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon={orderInformation.DONE.icon}
        title={orderInformation.DONE.text}
        orders={orders.filter(({ status }) => status === 'DONE')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
