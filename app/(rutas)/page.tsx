import { dataCardsSumary } from "@/data";
import { CardSumary } from "./componentes/CardSumary";
import { LastCustomers } from "./componentes/LastCustomers";
import { Distribuidor } from "./componentes/Distribuidor";
import { Total } from "./componentes/Total";
import { Integraciones } from "./componentes/Integraciones";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-center mt-1 pb-6">CALZADOS PRO CONDORT</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {dataCardsSumary.map(({ icon, total, average, title, tooltipText }) => (
          <CardSumary
            key={title}
            icon={icon}
            total={total}
            average={average}
            title={title}
            tooltipText={tooltipText}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 xl:gap-x-10 mt-12">
        <LastCustomers />
        <div className="xl:mt-0">
          <Distribuidor />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-y-10 xl:gap-x-10 mt-12 mb-10 justify-center">
        <Total />
        <Integraciones />
      </div>
    </div>
  );
}
