import { rulesData,  healthSafetyData, cancellationData} from "../../../lib";
import "./ListingInfo.css"
import { Box } from '../../shared';


export default function ListingInfo () {
  const renderList = (data) =>
    data.map((item, index) => (
      <div key={index} className="tk-list-item">
        {item.icon && <item.icon className="tk-icon" />}
        <span>{item.text}</span>
      </div>
    ));

  return (
    <Box>
      <h2 className="tk-main-header">Things to know</h2>
      <div className="tk-content-grid">
        
        <div className="tk-column">
          <h3 className="tk-sub-header">House rules</h3>
          <div className="tk-list">{renderList(rulesData)}</div>
        </div>

        <div className="tk-column">
          <h3 className="tk-sub-header">Health & safety</h3>
          <div className="tk-list">
            {renderList(healthSafetyData)}
            <p className="tk-show-more-link">Show more</p>
          </div>
        </div>

        <div className="tk-column">
          <h3 className="tk-sub-header">Cancellation policy</h3>
          <div className="tk-cancellation-text">
            {cancellationData[0].text}
          </div>
          <p className="tk-show-more-link">Show more</p>
        </div>
      </div>
    </Box>
  );
};