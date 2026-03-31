import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link as RouterLink } from 'react-router';

interface Props {
  totalCount: number
  totalPrice: number
}

export const Header = ({ totalCount, totalPrice }: Props) => {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}>Plovo App
        </Typography>
        <Button 
          component={RouterLink} 
          to="/basket" 
          color="inherit"
          startIcon={<ShoppingBasketIcon />}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
            <Typography variant="caption" sx={{ lineHeight: 1 }}>
              Items: <strong>{totalCount}</strong>
            </Typography>
            <Typography variant="caption" sx={{ lineHeight: 1 }}>
              Total: <strong>{totalPrice} $</strong>
            </Typography>
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  )
}
