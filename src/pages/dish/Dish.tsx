import { useNavigate, useParams } from "react-router"
import Button from '@mui/material/Button';

export const Dish = () => {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()

    const goToEditDish = () => {
        navigate(`/dish/edit/${id}`)
    }

    return(
        <div>
            Dish
            <Button onClick={goToEditDish}>Edit dish</Button>
        </div>
    )
}