import Image from "next/image";
import LoginForm from "./(home)/components/login-form";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 px-5 w-full max-w-[600px] mx-auto mt-5">
      <div className="flex flex-col w-full">
        <Image
          src="/medpet.svg"
          alt="MedPet Logo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-48 mx-auto"
        />
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-sm opacity-60">
          Bem-vindo ao sistema MetPet, insira seus dados para entrar.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Home;
