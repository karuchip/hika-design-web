"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  // スクロール制御
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Drawerの開閉状態
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Drawerが開いているときはヘッダーを隠さない
      if (isDrawerOpen) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDrawerOpen]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const iconMap: { [key: string]: React.ElementType } = {
    HomeIcon: HomeIcon,
    LocalLibraryIcon: LocalLibraryIcon,
    CropOriginalIcon: CropOriginalIcon,
    MailOutlineIcon: MailOutlineIcon,
    LockIcon: LockIcon,
  };

  const navLinks = [
    { label: "Home", href: "/", icon: "HomeIcon" },
    { label: "Blog", href: "/blog/show", icon: "LocalLibraryIcon" },
    { label: "Portfolio", href: "/#portfolio", icon: "CropOriginalIcon" },
    { label: "お問合せ", href: "/contact", icon: "MailOutlineIcon" },
    { label: "プライバシーポリシー", href: "/privacy", icon: "LockIcon" },
  ];

  return (
    <>
      <div className={`fixed z-[100] w-screen bg-[#FFFFFF] transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="flex justify-between items-center p-6 md:p-10">
          <Link href="/">
            <Image src="/img/HikaDev+Design.png" alt="Hika Design logo" width={53} height={42} className="h-auto"/>
          </Link>

          {/* --- デスクトップ用メニュー (md以上) --- */}
          <div className="hidden md:flex text-[18px] text-indigo-500 items-center">
            {navLinks.map((link, index) => {

              if(index > 0 && index <3 ){
                return(
                  <p key={link.label} className="mr-10 hover:text-indigo-500/50">
                    <Link href={link.href}>{link.label}</Link>
                  </p>
                )
              }
            })}
            <p className="hover:text-indigo-500/50">
              <Link href="/contact"><MailOutlineIcon/></Link>
            </p>
          </div>

          {/* --- モバイル用ハンバーガーボタン (md未満) --- */}
          <div className="md:hidden">
            <IconButton onClick={toggleDrawer(true)} aria-label="menu">
              <MenuIcon className="text-indigo-500" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* --- MUI Drawer (左から出現) --- */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List className="pt-10">
            {navLinks.map((link, index) => {

              const IconTag = iconMap[link.icon];
              return(
                <div key={index}>
                  <ListItem key={link.label} disablePadding>
                    <Link href={link.href} className="w-full">
                      <ListItemButton
                        sx={{
                          py: 2,
                          px: 3,
                          transition: 'all 0.3s', // 変化を滑らかに
                          '&:hover': {
                            backgroundColor: 'rgba(99, 102, 241, 0.08)', // indigo-500の透明度8%
                            // 欲張るなら、ホバー時に少し右に動かす演出も！
                            '& .MuiListItemText-root': {
                              transform: 'translateX(4px)',
                              transition: 'transform 0.3s',
                            }
                          }
                        }}
                      >
                        <IconTag sx={{ color: '#6366f1', mr: 2 }} />
                        <ListItemText primary={link.label} sx={{ color: '#6366f1' }} />
                      </ListItemButton>
                    </Link>
                  </ListItem>

                  {index < navLinks.length - 1 && (
                    <Divider variant="middle" component="li" sx={{ borderColor: 'rgba(99, 102, 241, 0.1)' }} />
                  )}
                </div>
              )})}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
