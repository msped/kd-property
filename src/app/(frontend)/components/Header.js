'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import KDPropertyLogoPng from '/public/kd-property-circle.png';

const styles = {
    navigationButtons: {
        display: {
            xs: 'none',
            sm: 'inline-block'
        }
    }
}

export default function Header(props) {
    const { window } = props;
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
    

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const isHomepage = pathname === '/';
    

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar 
                position={isHomepage ? 'absolute' : 'static'} 
                sx={{
                    backgroundColor: isHomepage ? 'transparent': 'white',
                    color: isHomepage ? 'white': 'black',
                    zIndex: isHomepage ? 10 : 1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    boxShadow: 'none'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: { xs: 0, sm: 1 }, display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center' }}>
                            {/* Left Links */}
                            <Button color="inherit" component={Link} href="/" aria-label="Home" sx={styles.navigationButtons} mr={2}>
                                Home
                            </Button>
                            <Button color="inherit" component={Link} href="/services" aria-label="Our Services" sx={styles.navigationButtons} mr={3}>
                                Our Services
                            </Button>

                            {/* Logo */}
                            <Box sx={{ display: { xs: 'none', sm: 'inline-block' }}}>
                                <Link href="/">
                                    <Image
                                        alt="KD Property Developments"
                                        src={KDPropertyLogoPng}
                                        height={75}
                                        width={75}
                                        priority
                                    />
                                </Link>
                            </Box>

                            {/* Right Links */}
                            <Button color="inherit" component={Link} aria-label='Testimonials' href="/testimonials" sx={styles.navigationButtons} ml={3}>
                                Testimonials
                            </Button>
                            <Button color="inherit" component={Link} href="/contact" aria-label='Contact' sx={styles.navigationButtons}>
                                Contact
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1}} />
                    <IconButton onClick={handleDrawerToggle}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Link href="/">
                        <Image
                            alt="KD Property Developments"
                            src={KDPropertyLogoPng}
                            height={75}
                            width={75}
                            priority
                        />
                    </Link>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} aria-label='Home' href='/'>
                                <ListItemText primary='Home' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} aria-label='Our Services' href='/services'>
                                <ListItemText primary='Our Services' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} aria-label='Testimonials' href='/testimonials'>
                                <ListItemText primary='Testimonials' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} aria-label='Contact' href='/contact'>
                                <ListItemText primary='Contact' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
