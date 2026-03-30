import { IconButton, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import type { IBasket } from '../../types'

interface Props {
  item: IBasket
  onAdd: () => void
  onRemove: () => void
}

export const BasketItem = ({ item, onAdd, onRemove }: Props) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      mb: 2, 
      borderBottom: '1px solid #eee', 
      pb: 1 
    }}>
      <Typography sx={{ flex: 1 }}>{item.dish.name}</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={onRemove} size="small" color="error"><RemoveIcon /></IconButton>
        <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>{item.count}</Typography>
        <IconButton onClick={onAdd} size="small" color="primary"><AddIcon /></IconButton>
      </Box>
        <Typography sx={{ ml: 2, fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
        {item.dish.price * item.count} $</Typography>
    </Box>
  )
}