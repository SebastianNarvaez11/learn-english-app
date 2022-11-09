import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'

export const ListForLevel = () => {


    
    return (

        <Box marginTop={2}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 300, borderRadius: 3, backgroundColor: '#FBE6EC' }}>
                        <CardActionArea>
                            <Box display='flex'>
                                <Box flex={1} alignSelf="center">
                                    <Typography fontSize={50} align="center">☠️</Typography>
                                </Box>
                                <Box flex={2}>
                                    <CardContent>
                                        <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                            Dificiles
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            30  Palabras
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 300, borderRadius: 3, backgroundColor: '#EBF3FC' }}>
                        <CardActionArea>
                            <Box display='flex'>
                                <Box flex={1} alignSelf="center">
                                    <Typography fontSize={50} align="center">👀</Typography>
                                </Box>
                                <Box flex={2}>
                                    <CardContent>
                                        <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                            Intermedias
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            30  Palabras
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 300, borderRadius: 3 }}>
                        <CardActionArea>
                            <Box display='flex'>
                                <Box flex={1} alignSelf="center">
                                    <Typography fontSize={50} align="center">💪</Typography>
                                </Box>
                                <Box flex={2}>
                                    <CardContent>
                                        <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                            Faciles
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            30  Palabras
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    )
}
