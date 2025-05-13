import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import React from "react";
import { GiPadlock } from "react-icons/gi";

export default function LoginForm() {
    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row gap-3 items-center">
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Login</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome back to HeartSync</p>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <div className='space-y-4'>
                        <Input 
                            label='Email'
                            type='email'
                            variant='bordered'
                        />
                         <Input 
                            label='Password'
                            type='password'
                            variant='bordered'
                        />
                        <Button fullWidth color='secondary' type='submit'>
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
