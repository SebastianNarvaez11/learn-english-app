import { SearchOutlined, AccountCircleRounded } from "@mui/icons-material"
import NextLink from "next/link"
import { AppBar, Toolbar, Link, Typography, Box, IconButton, Badge, Button, FormControl, OutlinedInput, InputAdornment } from "@mui/material"

export const Navbar = () => {
    return (
        <AppBar elevation={0} position='fixed' style={{ backgroundColor: 'white', height: 60 }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>

                <Box flex={1} >
                    <NextLink href="/" passHref style={{ textDecoration: 0, color: '#494969'}}>
                        <Typography variant="h6" alignItems="center">Aprende Ingles</Typography>
                    </NextLink>
                </Box>

                <Box flex={1} textAlign='end'>
                    <NextLink href="/" passHref >
                        <IconButton size="large">
                            <AccountCircleRounded />
                        </IconButton>
                    </NextLink>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
