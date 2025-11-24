
import { AirVent, Bike, Bone, Camera, Flame, ForkKnife, Leaf, Refrigerator, WashingMachine, Wifi } from 'lucide-react';
import { Box } from '../../shared';

const amenitiesData = [
    {title: "Garden view", icon: Leaf},
    {title: "Wifi", icon: Wifi},
    {title: "Free washer - in building", icon: WashingMachine},
    {title: "Central air conditioning", icon: AirVent},
    {title: "Refrigerator", icon: Refrigerator},
    {title: "Kitchen", icon: ForkKnife},
    {title: "Pets allowed", icon: Bone},
    {title: "Dryer", icon: Flame},
    {title: "Security cameras on property", icon: Camera},
    {title: "Bicycles", icon: Bike},
];

export default function Amenities () {
  return (
    <Box>
      <h1>What this place offers</h1>
      <div className="amenities-grid">

        {amenitiesData.map((amenity, index) => {
          const Icon = amenity.icon;
          return (
            <div key={index} className="amenity-item">
              {Icon ? <Icon className="amenity-icon" /> : <span className="amenity-icon-placeholder" />}
              <span className="amenity-text">{amenity.title}</span>
            </div>
          );
        })}
      </div>

      <button className="show-all-button">Show all 37 amenities</button>
    </Box>
  );
};
