import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import LoginForm from './Login';
import SignupForm from './SignUpPage';

const AuthPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>Login or create an account to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'login' | 'signup')}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login" className='font-semibold text-black'>Login</TabsTrigger>
                            <TabsTrigger value="signup" className='font-semibold text-black'>Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" activeValue={activeTab}>
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="signup" activeValue={activeTab}>
                            <SignupForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthPage;
