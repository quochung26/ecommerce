import LoginForm from "@/app/admin/(auth)/login/form";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm">
                <h3 className="font-semibold tracking-tight text-xl space-y-1.5 p-6">Login</h3>
                <LoginForm />
            </div>
        </div>
    )
}