"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "@/components/ui/input-field"
import { SubmitButton } from "@/components/ui/submit-button"
import { handleLogin } from "@/modules/auth/authenticate"
import { createUser } from "@/modules/auth/create-user"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const CreateUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    cep: z.string().regex(/^\d{5}\d{3}$/, "Invalid CEP format"),
    phone: z.string().regex(/^\d{2}\d{4,5}\d{4}$/, "Invalid Phone format"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type CreateUserDtoType = z.infer<typeof CreateUserSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [addressData, setAddressData] = useState({ address: "", city: "" })
   const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserDtoType>({
    resolver: zodResolver(CreateUserSchema),
  })

  const fetchAddress = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (!data.erro) {
        setAddressData({ address: data.logradouro, city: data.localidade })
        setValue("address", data.logradouro)
        setValue("city", data.localidade)
      }
    } catch (error) {
      console.error("Error fetching address data:", error)
    }
  }

  const onSubmit = async (data: CreateUserDtoType) => {
    setIsLoading(true)
    try {
      const create = await createUser(data)
      if (create) {
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
      setIsLoading(false)}) }
    } catch (error) {
      console.error("Error creating user:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen w-full items-center justify-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Name" {...register("name")} error={errors.name?.message} />
              <InputField label="Email" type="email" {...register("email")} error={errors.email?.message} />
              <InputField label="Password" type="password" {...register("password")} error={errors.password?.message} />
              <InputField
                label="Confirm Password"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
              <InputField
                label="CEP"
                {...register("cep")}
                error={errors.cep?.message}
                onBlur={(e) => fetchAddress(e.target.value)}
              />
              <InputField label="Phone" {...register("phone")} error={errors.phone?.message} />
              <InputField
                label="Address"
                {...register("address")}
                error={errors.address?.message}
                className="sm:col-span-2"
                value={addressData.address}
              />
              <InputField
                label="City"
                {...register("city")}
                error={errors.city?.message}
                className="sm:col-span-2"
                value={addressData.city}
              />
            </div>
            <SubmitButton disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</SubmitButton>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className=" hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

