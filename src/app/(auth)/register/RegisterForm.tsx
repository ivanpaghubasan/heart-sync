"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
    });

    const [isVisibile, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible(!isVisibile);

    const onSubmit = (data: RegisterSchema) => {
        console.log(data);
    };

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row gap-3 items-center">
                        {/* <GiPadlock size={30} /> */}
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">
                        Welcome back to HeartSync
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Username"
                            type="username"
                            variant="bordered"
                            placeholder="Enter username"
                            {...register("username")}
                            isInvalid={!!errors.username}
                            aria-invalid={errors.username ? "true" : "false"}
                            errorMessage={errors.username?.message}
                        />
                        <Input
                            label="Email"
                            type="email"
                            variant="bordered"
                            placeholder="Enter email"
                            {...register("email")}
                            isInvalid={!!errors.email}
                            aria-invalid={errors.email ? "true" : "false"}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            type={isVisibile ? "text" : "password"}
                            variant="bordered"
                            placeholder="Enter password"
                            isInvalid={!!errors.password}
                            aria-invalid={errors.password ? "true" : "false"}
                            errorMessage={errors.password?.message}
                            endContent={
                                <button
                                    aria-label="toggle password visibility"
                                    type="button"
                                    className="focus:outline-none"
                                    onClick={toggleVisibility}
                                >
                                    {isVisibile ? (
                                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            {...register("password")}
                        />
                        <Button
                            isDisabled={!isValid}
                            fullWidth
                            color="secondary"
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
