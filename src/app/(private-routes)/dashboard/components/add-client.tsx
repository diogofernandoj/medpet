import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LinkIcon } from "lucide-react";
import SearchClient from "./search-client";
import { useState } from "react";

const AddClient = ({ setClientId }: { setClientId: (id: string) => void }) => {
  const [modal, setModal] = useState(false);

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button
          className="text-primary text-xs flex items-center gap-1"
          variant="ghost"
        >
          <LinkIcon size={14} /> Vincular cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90%] w-full max-w-[640px]">
        <SearchClient setClientId={setClientId} setModal={setModal} />
      </DialogContent>
    </Dialog>
  );
};

export default AddClient;
