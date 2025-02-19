"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "@/components/ui/input-field"
import { SubmitButton } from "@/components/ui/submit-button"
import { handleLogin } from "@/modules/auth/authenticate"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    toast.promise(
      handleLogin({ email: data.email, password: data.password }),
      {
        loading: 'Logging in...',
        success: <b>Login successful!</b>,
        error: <b>Login failed. Please try again.</b>,
      }
    ).then(() => {
      router.push('/')
    }).finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <>
    <div className="container  flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[450px] ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />
            <InputField
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <SubmitButton disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</SubmitButton>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Dont have an account?
            <Link href="/register" className=" hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}

