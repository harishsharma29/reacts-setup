import { Button, Grid } from "@mui/material";
import FormProvider from "../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { memo } from "react";
import RHFTextField from "../components/hook-form/RHFTextField";

function Login() {
    const methods = useForm({
        defaultValues: {
            userName: "",
            password: ""
        },
        mode: "all"
    });

    function onSubmit(...args) {
        console.log("elevate > Login | 15 | args ", args);
    }
    return (
        <Grid
            container
            spacing={2}
            height={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Grid item sm={8} lg={4} xl={3}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Grid container spacing={2} paddingBottom={2}>
                        <Grid item xs={12}>
                            <RHFTextField
                                label="Username/email"
                                name="userName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField
                                label="Password"
                                name="password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent={"flex-end"}>
                        <Grid
                            item
                            xs={6}
                            display={"flex"}
                            justifyContent={"flex-end"}
                            sx={{
                                "& button": {
                                    marginBottom: "16px"
                                }
                            }}
                        >
                            <Button type="submit">Login</Button>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Grid>
        </Grid>
    );
}

export default memo(Login);
