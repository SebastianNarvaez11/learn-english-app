import { ReactNode, FC } from 'react'
import { Box } from '@mui/material'



interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <Box>
            {children}
        </Box>
    )
}
