import RegisterForm from "@/components/auth/RegisterForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export default function AuthPage() {
  return (
    <div className="w-screen h-screen flex items-start justify-center pt-10">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="flex justify-between w-full">
          <TabsTrigger value="login">Ingresar</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <TabsContent value="login">
          <h1>Login</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}
