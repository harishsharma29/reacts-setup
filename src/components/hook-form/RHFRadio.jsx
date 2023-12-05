import * as React from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Box
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useFormContext, Controller } from "react-hook-form";
import { getRecurssiveObjectKeys } from "../../helper";

RHFRadio.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    singleLineRadio: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool
};

const RadioStyle = styled(RadioGroup)(({ theme, singlelineradio }) => ({
    flexDirection: "row",
    marginTop: "0 !important",
    "& > label": {
        marginRight: 0,
        alignItems: "center",
        color: theme.palette.common.black,
        marginLeft: 0,
        marginTop: 20,
        width: "25%"
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: singlelineradio === "true" ? "row" : "column",
        "& > label": {
            width: singlelineradio === "true" ? "25%" : "100%"
        }
    },
    [theme.breakpoints.between("sm", "md")]: {
        "& > label": {
            width: "33%",
            paddingRight: 20
        }
    }
}));

export default function RHFRadio({
    name,
    title,
    labels,
    singleLineRadio,
    onChange,
    required
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => (
                <>
                    <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={(theme) => ({
                            color: theme.palette.common.black,
                            display: "flex",
                            alignItems: "center",
                            [theme.breakpoints.down("sm")]: {
                                alignItems: "flex-start"
                            }
                        })}
                    >
                        {title}
                        {required && title.includes(" *") && " *"}
                    </FormLabel>
                    <RadioStyle
                        {...field}
                        singlelineradio={(singleLineRadio || "").toString()}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange && typeof onChange === "function") {
                                onChange(e);
                            }
                        }}
                    >
                        {labels.map((item) => (
                            <FormControlLabel
                                key={item.name + item.value}
                                value={item.value}
                                control={<Radio />}
                                label={item.name}
                            />
                        ))}
                    </RadioStyle>
                    <Box
                        sx={() => ({
                            color: "#FF4842",
                            fontSize: "0.75rem",
                            fontWeight: 400,
                            marginTop: "6px !important"
                        })}
                    >
                        {!!getRecurssiveObjectKeys(errors, name)?.message &&
                            getRecurssiveObjectKeys(errors, name)?.message}
                    </Box>
                </>
            )}
        />
    );
}
