import * as React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useFormContext, Controller } from "react-hook-form";
import { getRecurssiveObjectKeys } from "../../helper";

RHFSelectbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
    languageDropdown: PropTypes.bool,
    disable: PropTypes.bool,
    required: PropTypes.bool
};

const Item = styled(Select)(({ theme, languagedropdown }) => ({
    color: languagedropdown ? `${theme.palette.common.white} !important` : null,
    width: languagedropdown ? "110px" : null,
    height: languagedropdown ? "42px" : null,
    "& svg": {
        fill: languagedropdown
            ? `${theme.palette.common.white} !important`
            : null
    },
    "& fieldset": {
        borderColor: languagedropdown
            ? `${theme.palette.common.white} !important`
            : null,
        borderWidth: languagedropdown ? "1px !important" : null
    }
}));

export default function RHFSelectbox({
    name,
    label,
    menus,
    onChange,
    languageDropdown,
    disable,
    required = false
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => (
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            {label}
                            {required && !label.includes(" *") && " *"}
                        </InputLabel>
                        <Item
                            {...field}
                            {...(languageDropdown && {
                                languagedropdown: languageDropdown.toString()
                            })}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={label}
                            disabled={disable}
                            onChange={(...args) => {
                                if (
                                    onChange &&
                                    typeof onChange === "function"
                                ) {
                                    onChange(...args);
                                }
                                field.onChange(...args);
                            }}
                        >
                            {menus.map((item) => (
                                <MenuItem
                                    key={item.value + item.name}
                                    value={item.value}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Item>
                    </FormControl>
                    <Box
                        sx={() => ({
                            marginLeft: "14px",
                            color: "#EE353F",
                            fontSize: "0.75rem",
                            fontWeight: 400,
                            marginTop: "3px !important"
                        })}
                    >
                        {!!getRecurssiveObjectKeys(errors, name)?.message &&
                            getRecurssiveObjectKeys(errors, name)?.message}
                    </Box>
                </Box>
            )}
        />
    );
}
