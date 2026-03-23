import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getUserByHandle } from "../api/DevTree";
import HandleData from "../components/HandleData";

export default function HandlePage() {
  const { handle } = useParams()

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle!),
    queryKey: ['handle', handle],
    retry: 1
  })

  if(isLoading) return <p className="text-center text-white">Cargando...</p>
  if(error) return <Navigate to='/404' />

  if(data) return <HandleData data={data} />
}