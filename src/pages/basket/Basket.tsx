import { Container, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
import type { IBasketState, IDish, IOrderCustomer, IOrder } from "../../types";
import { axiosApi } from "../../axiosApi";
import { BasketItem } from "../../components/basket-item/BasketItem";
import { OrderForm } from "../../components/order-form/OrderForm";

interface Props {
  basketState: IBasketState;
  onAdd: (dish: IDish) => void;
  onRemove: (id: string) => void;
  clearBasket: () => void;
}

export const Basket = ({ basketState, onAdd, onRemove, clearBasket }: Props) => {
  const { items, totalPrice, totalCount } = basketState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrderSubmit = async (customer: IOrderCustomer) => {
    setLoading(true);
    try {
      const order: IOrder = {
        ...customer,
        items: items,
        totalPrice: totalPrice,
      };

      await axiosApi.post('/orders.json', order);
      
      clearBasket();
      alert('Order placed successfully!');
      navigate('/');
    } catch (e) {
      console.error("Order error:", e);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your basket is empty!
        </Typography>
        <Button variant="contained" component={RouterLink} to="/">
          Go to home page
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Order
      </Typography>

      {/* Список блюд с нумерацией */}
      <Box sx={{ mb: 4, mt: 4 }}>
        {items.map((item, index) => (
          <BasketItem
            key={item.dish.id}
            item={item}
            index={index + 1} // Передаем номер товара
            onAdd={() => onAdd(item.dish)}
            onRemove={() => onRemove(item.dish.id)}
          />
        ))}
      </Box>

      {/* Итоговая информация: Количество и Цена */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        mb: 4,
        padding: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 2
      }}>
        <Typography variant="body1" color="text.secondary">
          Total items: <strong>{totalCount}</strong>
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Total price: {totalPrice} $
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #ccc', pb: 1 }}>
        Delivery Details
      </Typography>
      
      <OrderForm onSubmit={handleOrderSubmit} loading={loading} />
    </Container>
  );
};