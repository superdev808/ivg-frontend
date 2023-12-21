import { TabPanel, TabView } from "primereact/tabview";
import { Site, SiteData } from "../constants";

const InputDetails = ({
  selectedSites,
  sitesData,
}: {
  selectedSites: Site[];
  sitesData: SiteData;
}) => {
  return (
    <TabView>
      {selectedSites.map((site: Site) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <p className="m-0">{site.name} input questions here</p>
          </TabPanel>
        );
      })}
      <TabPanel header="Summary">
        <p className="m-0">Input Summary here</p>
      </TabPanel>
    </TabView>
  );
};

export default InputDetails;
