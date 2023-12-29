import { TabPanel, TabView } from "primereact/tabview";
import { Site, SiteData } from "../constants";

interface ComponentDetailProps {
  selectedSites: Site[];
  sitesData: SiteData;
}

const ComponentDetails: React.FC<ComponentDetailProps> = ({ selectedSites }: ComponentDetailProps) => {
  return (
    <TabView scrollable>
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
