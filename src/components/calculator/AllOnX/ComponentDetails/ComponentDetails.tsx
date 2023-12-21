import { TabPanel, TabView } from "primereact/tabview";
import { Site } from "../constants";

const ComponentDetails = ({ selectedSites }: { selectedSites: Site[] }) => {
  return (
    <TabView>
      {selectedSites.map((site: Site) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <p className="m-0">{site.name} component answers here</p>
          </TabPanel>
        );
      })}
      <TabPanel header="Summary">
        <p className="m-0">Component Summary here</p>
      </TabPanel>
    </TabView>
  );
};

export default ComponentDetails;
