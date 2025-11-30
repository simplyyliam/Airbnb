import { faker } from "@faker-js/faker";
import { FakeListing } from "./faker.js";


export const listingsData = (userIds, numListings = 10) => {
  return Array.from({ length: numListings }).map(() => {
    const hostId = faker.helpers.arrayElement(userIds);
    return {
      host: hostId,
      title: FakeListing.title(),
      city: FakeListing.city(),
      country: FakeListing.country(),
      price: FakeListing.price(),
      guests: FakeListing.guests(),
      bedrooms: FakeListing.bedrooms(),
      bathrooms: FakeListing.bathrooms(),
      images: FakeListing.images(),
      amenities: FakeListing.amenities(),
      ratingsAverage: FakeListing.ratingsAverage(),
      ratingsQuantity: FakeListing.ratingsQuantity(),
      reviews: FakeListing.reviews(userIds),
    };
  });
};
