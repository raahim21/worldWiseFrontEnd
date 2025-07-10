import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { ProvideCities } from "../contexts/citiesContext";

function AppLayout() {
  return (
    <ProvideCities>
      <div className={styles.app}>
        <Sidebar />
        <Map />
      </div>
    </ProvideCities>
  );
}

export default AppLayout;
