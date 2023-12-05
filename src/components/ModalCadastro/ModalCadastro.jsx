import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import './styles.css';
import PlacesAutocomplete from "../PlacesAutoComplete";
import { useState } from "react";
import { getDatabase, ref, push, onValue, get, set } from 'firebase/database';

export default function ModalCadastro(props) {

  const [nome, setNome] = useState("");
  const [location, setLocation] = useState({});
  function salvar() {
    if (location && location) {
      const databaseRef = ref(getDatabase(), 'marcadores');
      const newLocationRef = push(databaseRef);

      set(newLocationRef, {
        name: nome,
        latitude: location.lat,
        longitude: location.lng,
      })
        props.getMarcadores()
      
      setNome("")
      setLocation({})

    } else {
      console.error('Selecione um local e forneça um nome antes de salvar.');
    }
  };

  function handleSelect(data){
    setLocation(data)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Novo Estacionamento</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cadastrar Estacionamento</SheetTitle>
          <SheetDescription>
            Selecione um local no campo de busca e de um nome para registrar um novo estacionaamento
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label
              htmlFor="username"
              className="text-right">
              Nome
            </Label>
            <Input
              id="username"
              onChange={e=>setNome(e.target.value)}
              placeholder="Nome do local"
              value={nome}
              className="col-span-3" />
          </div>
          <PlacesAutocomplete
            id="name"
            handleSelect={handleSelect}
            className="col-span-3" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={salvar}>
              Salvar Local
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
