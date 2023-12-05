import React, { useCallback } from "react";
import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, InputAdornment, Tooltip } from "@mui/material";
import { Help as HelpIcon } from "@mui/icons-material";

// ----------------------------------------------------------------------
const ONLY_NUMBER = /^[0-9]*$/i;

RHFTextField.propTypes = {
    name: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export default function RHFTextField({
    name,
    label,
    handleChange,
    disabled,
    ...other
}) {
    const { control } = useFormContext();
    const {
        endAdornmentHelpText,
        noInitalZero,
        maxLength,
        onKeyDown,
        hanleBlur,
        allcaps,
        required,
        type,
        maxValue,
        ...rest
    } = other;

    const handleKeyDonw = (e) => {
        if (type === "number" && !ONLY_NUMBER.test(e.target.value)) {
            return e.preventDefault();
        }
        if (onKeyDown && typeof onKeyDown === "function") {
            return onKeyDown.call(null, e);
        }
        return e;
    };

    const checkValueConditions = useCallback(
        (value) =>
            (noInitalZero && +value === 0) ||
            (maxLength && maxLength < value.length)(
                type === "number" && (+value < 0 || !ONLY_NUMBER.test(value))
            ),
        []
    );

    const handleOnChange = (onChange, event) => {
        const { value } = event.target;
        if (value && checkValueConditions(value)) {
            return event.preventDefault();
        }
        if (maxLength && maxLength > value.length) {
            event.target.value = value.substr(0, maxLength);
        }
        if (type === "number" && value.indexOf("0") === 0) {
            event.target.value = value.substr(1, value.length);
        }
        if (type === "number" && +value > maxValue) {
            event.target.value = value.substr(0, `${maxValue}`.length);
        }
        if (allcaps && value) {
            event.target.value = value.toUpperCase();
        }
        if (handleChange && typeof handleChange === "function") {
            handleChange(event);
        }
        return onChange(event);
    };

    const handleBlur = (onBlur, event) => {
        if (hanleBlur && typeof hanleBlur === "function") {
            hanleBlur.call(event);
        }
        return onBlur(event);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { value, onBlur, onChange, ...field },
                fieldState: { error }
            }) => (
                <TextField
                    {...field}
                    disabled={disabled}
                    onKeyDown={handleKeyDonw}
                    onChange={handleOnChange.bind(this, onChange)}
                    label={
                        <>
                            {label}
                            {required && !label.includes(" *") && " *"}
                        </>
                    }
                    fullWidth
                    value={
                        (typeof value === "number" && value === 0) ||
                        value === null
                            ? ""
                            : value || ""
                    }
                    error={!!error}
                    helperText={error?.message}
                    onBlur={handleBlur.bind(this, onBlur)}
                    {...(endAdornmentHelpText && {
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={endAdornmentHelpText}
                                        aria-label="add"
                                        placement="right"
                                    >
                                        <HelpIcon />
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }
                    })}
                    {...(!["text", "number"].includes(type) && { type })}
                    {...rest}
                />
            )}
        />
    );
}
