import { useContext, useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, Stack, IconButton } from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";

import { CContext } from "../../utils/CContextProvider";
// ----------------------------------------------------------------------

const LANGS = [
    {
        value: "en",
        label: "English",
        icon: "/static/icons/ic_flag_en.svg"
    },
    {
        value: "hi",
        label: "हिन्दी",
        icon: "/static/icons/ic_flag_in.svg"
    }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
    const { lang, changeLanguage } = useContext(CContext);
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
        LANGS.filter((i) => i.value === lang)[0]
    );

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (value) => {
        if (value !== lang) {
            changeLanguage();
            setSelected(LANGS.filter((i) => i.value === value)[0]);
            handleClose();
        }
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.focusOpacity
                            )
                    })
                }}
            >
                <img src={selected.icon} alt={selected.label} />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{
                    mt: 1.5,
                    ml: 0.75,
                    width: 180,
                    "& .MuiMenuItem-root": {
                        px: 1,
                        typography: "body2",
                        borderRadius: 0.75
                    }
                }}
            >
                <Stack spacing={0.75}>
                    {LANGS.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === lang}
                            onClick={() => handleChange(option.value)}
                        >
                            <Box
                                component="img"
                                alt={option.label}
                                src={option.icon}
                                sx={{ width: 28, mr: 2 }}
                            />

                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </MenuPopover>
        </>
    );
}
