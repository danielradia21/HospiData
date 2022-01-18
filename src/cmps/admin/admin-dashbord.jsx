import { CardList } from "./card-list";
import { LineChart } from "./line-chart";
import { PieChart } from "./pie-chart";

export function AdminDashBord() {
    
    return <div className="flex dashBord-continer">
         <CardList/>
        <div className="dashbord-analitics-continer">
         <LineChart/>
         <div className="admin-spce"></div>
         <PieChart/>
        </div>

    </div>;
}
