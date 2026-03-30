import { Route, Routes } from 'react-router';
import { useState } from 'react';
import { Container } from '@mui/material';
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { Dish } from './pages/dish/Dish';
import { AddDish } from './pages/add-dish/AddDish';
import { EditDish } from './pages/edit-dish/EditDish';
import { Basket } from './pages/basket/Basket';
import { addDishToBasket, removeDishFromBasket } from './utils/basketHelpers';
import type { IBasketState, IDish } from './types';
import './App.css';

function App() {
  const [basket, setBasket] = useState<IBasketState>({
    items: [],
    totalCount: 0,
    totalPrice: 0
  });

  // Добавление блюда (кнопка "+" и кнопка в списке)
  const handleAddDish = (dish: IDish) => {
    setBasket(prev => addDishToBasket(prev, dish));
  };

  // Уменьшение количества или удаление (кнопка "-")
  const handleRemoveDish = (dishId: string) => {
    setBasket(prev => removeDishFromBasket(prev, dishId));
  };

  // Полная очистка (вызывается после успешного заказа)
  const clearBasket = () => {
    setBasket({ items: [], totalCount: 0, totalPrice: 0 });
  };

  return (
    <>
      <Header totalCount={basket.totalCount} totalPrice={basket.totalPrice}/>
      <Container style={{ padding: '20px' }}>
        <Routes>
          <Route path='/' element={<Home addDishToBasket={handleAddDish}/>}/>
          <Route path='/dish/:id' element={<Dish/>}/>
          <Route path='/dish/create' element={<AddDish/>}/>
          <Route path='/dish/edit/:id' element={<EditDish/>}/>
          <Route 
            path='/basket' 
            element={
              <Basket 
                basketState={basket} 
                onAdd={handleAddDish} 
                onRemove={handleRemoveDish} 
                clearBasket={clearBasket}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;