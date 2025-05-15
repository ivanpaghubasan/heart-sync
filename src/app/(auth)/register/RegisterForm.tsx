"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from '@/app/actions/authActions';

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid, isSubmitting },
    } = useForm<RegisterSchema>({
       // resolver: zodResolver(registerSchema),
        mode: "onTouched",
    });

    const [isVisibile, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible(!isVisibile);

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        
        if (result.status === 'success') {
            console.log('User registered successfully!');
        } else {
            if (Array.isArray(result.error)) {
                result.error.forEach((e) => {
                    const fieldName = e.path.join('.') as 'name' | 'email' | 'password';
                    setError(fieldName, {message: e.message});
                });
            } else {
                setError('root.serverError', {message: result.error});
            }
        }
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
                            label="Name"
                            type="text"
                            variant="bordered"
                            placeholder="Enter name"
                            {...register("name")}
                            isInvalid={!!errors.name}
                            aria-invalid={errors.name ? "true" : "false"}
                            errorMessage={errors.name?.message}
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
                        {errors.root?.serverError && (
                            <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                        )}
                        <Button
                        isLoading={isSubmitting}
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
