import './App.css'
import { Route, Routes } from 'react-router'
import { Dish } from './pages/dish/Dish'
import { Home } from './pages/home/Home'
import { Header } from './components/header/Header'
import { AddDish } from './pages/add-dish/AddDish'
import { Container } from '@mui/material'
import { EditDish } from './pages/edit-dish/EditDish'
import type { IBasketState, IDish } from './types'
import { useState } from 'react'
import { addDishToBasket, removeDishFromBasket } from './utils/basketHelpers'
import { Basket } from './pages/basket/Basket'

function App() {
  const [basket, setBasket] = useState<IBasketState>(
    {
      items: [],
      totalCount: 0,
      totalPrice: 0
    }
  )

  const nandleAddDish = (dish: IDish) => {
    const updatedBasket = addDishToBasket(basket, dish)
    setBasket(updatedBasket)
  }

  const handleRemoveDish = (dishId: string) => {
  setBasket(prev => removeDishFromBasket(prev, dishId))
}

const clearBasket = () => {
  setBasket({ items: [], totalCount: 0, totalPrice: 0 })
}

  return (
    <>
    <Header totalCount={basket.totalCount} totalPrice={basket.totalPrice}/>
    <Container style={{
      padding: '20px'
    }}>
      <Routes>
        <Route path='/basket' element={<Basket basketState={basket} 
        onAdd={handleAddDish} 
        onRemove={handleRemoveDish} 
        clearBasket={clearBasket}/>}/>
        <Route path='/' element={<Home addDishToBasket={nandleAddDish}/>}/>
        <Route path='/dish/:id' element={<Dish/>}/>
        <Route path='/dish/create' element={<AddDish/>}/>
        <Route path='/dish/edit/:id' element={<EditDish/>}/>
        <Route path='/basket' element={<Basket basketState={basket}/>}/>
      </Routes>
    </Container>
    </>
  )
}

export default App
