import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import ModalCadastro from "./ModalCadastro/ModalCadastro"
import { useEffect, useState } from "react"
import { getDatabase, ref, push, onValue, get, set } from 'firebase/database';
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

export default function Pesquisa(props) {
  const [query, setQuery] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    buscarLocais("");
  }, []);

  async function buscarLocais(q) {
    const marcadoresRef = ref(getDatabase(), 'marcadores');
    const snapshot = await get(marcadoresRef);

    const listaMarcadores = [];
    snapshot.forEach((childSnapshot) => {
      listaMarcadores.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });

    const filteredMarkers = listaMarcadores.filter((marker) =>
      marker.name.toLowerCase().includes(q.toLowerCase())
    );
    setSavedLocations(filteredMarkers);
  }

  function handlerItem(item) {
    props.handlerItem(item)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estacionamento</CardTitle>
        <CardDescription>
          Busque ou cadastre um novo estacionamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            id="picture"
            placeholder="Pesquisar um estacionamento"
            onChange={e => {
              setQuery(e.target.value),
                buscarLocais(e.target.value)
            }
            }
            value={query} />
          <Separator className="my-4" />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Locais</h4>
            <ScrollArea className="h-72 w-400 rounded-md border" >

              {savedLocations.map(item => {
                return (
                  <>
                    <div className="flex space-x-6 transition-all hover:bg-accent hover:text-accent-foreground" style={{ marginTop: 5, padding: 10 }}>
                      <Button variant="outline" size="icon" onClick={() => handlerItem(item)}>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-2" style={{ marginTop: 5 }} />
                  </>
                )
              })
              }
            </ScrollArea>
          </div>
          <ModalCadastro getMarcadores={props.getMarcadores}/>
        </div>
      </CardContent>
    </Card>
  )
}