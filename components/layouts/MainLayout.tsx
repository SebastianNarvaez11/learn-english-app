import { ReactNode, FC } from 'react'
import { Box } from '@mui/material'
import { Navbar } from '../ui'



interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Box sx={{ margin: '80px auto', paddingLeft: { xs: '15px', sm: '60px' }, paddingRight: { xs: '10px', sm: '60px' }, maxWidth: '1440px' }}>
                {children}
            </Box>
        </Box>
    )
}
