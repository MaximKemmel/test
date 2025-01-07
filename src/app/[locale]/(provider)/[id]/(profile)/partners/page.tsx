import { Partners } from "@/components/pages/(profile)/partners";


export default function PartnersPage({params}:{params:{id:string}}) {
    return <Partners id={params}/>
}