import { Typography } from '@mui/material'
import { ButtonContainer } from './styles'

interface FeaturedButtonProps {
    title: string
}

const FeaturedButton = ({title}:FeaturedButtonProps) => {
  return (
    <ButtonContainer>
        <Typography component={'div'}>{title}</Typography>
    </ButtonContainer>
  )
}

export default FeaturedButton