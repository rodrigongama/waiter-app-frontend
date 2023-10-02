import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const ModalBody = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  width: 480px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }
  }
`;

export const StatusContainer = styled.div`
  margin-top: 32px;

  small {
    font-size: 14px;
    opacity: 0.8;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }
`;

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    display: block;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 16px;
    opacity: 0.8;
  }
`;

export const OrderItem = styled.div`
  display: flex;

  & + & {
    margin-top: 16px;
  }

  img {
    border-radius: 6px;
    height: 28.51px;
    width: 56px;
  }

  .quantity {
    color: #666;
    font-size: 14px;
    display: block;
    min-width: 20px;
    margin-left: 12px;
  }

  .product-details {
    margin-left: 4px;

    strong {
      display: block;
      margin-bottom: 4px;
    }

    span {
      color: #666;
      font-size: 14px;
    }
  }
`;

export const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  span {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .primary {
    background: #333333;
    border: 0;
    border-radius: 48px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
  }

  .secondary {
    background: transparent;
    border: 0;
    color: #d73035;
    font-weight: bold;
    margin-top: 12px;
    padding: 14px 24px;
  }
`;
