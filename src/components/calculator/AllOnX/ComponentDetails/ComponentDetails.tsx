import { TabPanel, TabView } from "primereact/tabview";
import { Site, SiteData } from "../constants";

interface ComponentDetailProps {
  selectedSites: Site[];
  sitesData: SiteData;
}

/**
 * Name : ComponentDetails.
 * Desc : The `ComponentDetails` function is a React functional component that renders a TabView component
 * with multiple TabPanels based on the `selectedSites` prop, and a final TabPanel for the summary.
 * @param {array} selectedSites
 * @param {object} sitesData
 */
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
