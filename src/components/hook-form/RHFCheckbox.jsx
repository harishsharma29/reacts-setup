import React from "react";
import PropTypes from "prop-types";

// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hrefAddress: PropTypes.string,
    anchor: PropTypes.bool
};

const LabelBox = styled(Box)(() => ({
    "& .anchor-tag": {
        textTransform: "none"
    }
}));

const ErrorLabel = styled("p")(({ theme }) => ({
    color: theme.palette.inputError,
    fontSize: "0.75rem",
    fontWeight: 400,
    textAlign: "left",
    marginTop: "6px !important"
}));

export function RHFCheckbox({ name, label, ...other }) {
    const { control } = useFormContext();

    return (
        <>
            <FormControlLabel
                control={
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Checkbox {...field} checked={field.value} />
                        )}
                    />
                }
                label={<LabelBox>{label}</LabelBox>}
                {...other}
            />
        </>
    );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool
};

export function RHFMultiCheckbox({ name, options, title, required, ...other }) {
    const { control } = useFormContext();

    const onSelected = (option, field) =>
        field.value && field.value.includes(option)
            ? field.value.filter((value) => value !== option)
            : [...(field.value ? field.value : []), option];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <FormLabel
                        sx={(theme) => ({
                            color: theme.palette.common.black,
                            display: "flex",
                            alignItems: "center",
                            [theme.breakpoints.down("sm")]: {
                                alignItems: "flex-start"
                            },
                            marginBottom: "-24px"
                        })}
                    >
                        {title}
                        {required && !title.includes(" *") && " *"}
                    </FormLabel>
                    <FormGroup>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={
                                            field?.value &&
                                            field?.value?.includes(option.value)
                                        }
                                        onChange={() =>
                                            field.onChange(
                                                onSelected(option.value, field)
                                            )
                                        }
                                    />
                                }
                                label={option.label}
                                {...other}
                            />
                        ))}
                    </FormGroup>
                    {!!error && error?.message && (
                        <ErrorLabel>{error?.message}</ErrorLabel>
                    )}
                </>
            )}
        />
    );
}
