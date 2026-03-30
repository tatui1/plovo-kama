import { TextField, Button, Box } from '@mui/material';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { IOrderCustomer } from '../../types';

interface Props {
  onSubmit: (customer: IOrderCustomer) => void;
  loading: boolean;
}

export const OrderForm = ({ onSubmit, loading }: Props) => {
  const [customer, setCustomer] = useState<IOrderCustomer>({
    name: '',
    address: '',
    phone: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(customer);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
    >
      <TextField 
        label="Name" 
        name="name" 
        value={customer.name}
        required 
        fullWidth
        onChange={handleChange} 
      />
      <TextField 
        label="Address" 
        name="address" 
        value={customer.address}
        required 
        fullWidth
        onChange={handleChange} 
      />
      <TextField 
        label="Phone" 
        name="phone" 
        value={customer.phone}
        required 
        fullWidth
        onChange={handleChange} 
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="success" 
        size="large"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </Button>
    </Box>
  );
};