import ClientForm from "../components/client-form";

const NewClient = () => {
  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <div className="p-12 flex flex-col gap-6 max-w-3xl">
        <h2 className="text-2xl font-medium">Novo cliente</h2>
        <ClientForm />
      </div>
    </div>
  );
};

export default NewClient;
