"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });
    const [isVisibile, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible(!isVisibile);

    const onSubmit = async (data: LoginSchema) => {
        const result = await signInUser(data);
        if (result.status === 'success') {
            router.push('/members');
            router.refresh();
        } else {
            toast.error(result.error as string);
        }
    };

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row gap-3 items-center">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Login</h1>
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
                            label="Email"
                            type="email"
                            variant="bordered"
                            //placeholder="Enter your email"
                            {...register("email")}
                            isInvalid={!!errors.email}
                            aria-invalid={errors.email ? "true" : "false"}
                            errorMessage={errors.email?.message as string}
                        />
                        <Input
                            label="Password"
                            type={isVisibile ? "text" : "password"}
                            variant="bordered"
                            //placeholder="Enter your password"
                            isInvalid={!!errors.password}
                            aria-invalid={errors.password ? "true" : "false"}
                            errorMessage={errors.password?.message as string}
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
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            color="secondary"
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
