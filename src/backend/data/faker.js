import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const saltRounds = 10;

//  The function hashPassword takes a password as input and returns a hashed version using bcrypt with a
//  specified number of salt rounds.

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

export const FakeUser = {
  name: () => faker.person.firstName(),
  email: () => faker.internet.email(),
  password: () => hashPassword(faker.internet.password(8)),
  avatar: () => faker.image.avatar()
};

const categories = [
  "apartment",
  "cabin",
  "house",
  "studio",
  "villa",
  "loft",
  "condo"
];


export const FakeListing = {
  title: () => faker.commerce.productName(),
  city: () => faker.location.city(),
  country: () => faker.location.country(),
  price: () => faker.number.int({ min: 50, max: 500 }),
  guests: () => faker.number.int({ min: 1, max: 8 }),
  bedrooms: () => faker.number.int({ min: 1, max: 5 }),
  bathrooms: () => faker.number.int({ min: 1, max: 3 }),
  images: (num = 3) => {
    // pick a random category for this listing
    const category = faker.helpers.arrayElement(categories);
    return Array.from({ length: num }).map(
      (_, i) => `https://source.unsplash.com/800x600/?${category}&sig=${faker.string.uuid()}`
    );
  },
  amenities: () =>
    faker.helpers.arrayElements(
      ["Wifi", "Kitchen", "Air Conditioning", "Parking", "Fireplace", "Pool", "TV"],
      faker.number.int({ min: 2, max: 5 })
    ),
  ratingsAverage: () => parseFloat(faker.number.float({ min: 3, max: 5, precision: 0.1 }).toFixed(1)),
  ratingsQuantity: () => faker.number.int({ min: 1, max: 50 }),
  reviews: (userIds) => {
    const guestId = faker.helpers.arrayElement(userIds);
    const numReviews = faker.number.int({ min: 1, max: 5 });
    return Array.from({ length: numReviews }).map(() => ({
      user: guestId,
      rating: faker.number.int({ min: 3, max: 5 }),
      comment: faker.lorem.sentence(),
    }));
  },
};

export const FakeReviews = {
  comments: [
    "Amazing stay, highly recommend!",
    "Very comfortable and cozy place.",
    "Host was super friendly and helpful.",
    "Perfect location, close to everything.",
    "Loved the apartment, clean and spacious.",
    "Great value for the price!",
    "The place had everything we needed.",
    "Would definitely stay here again.",
    "Check-in was smooth and easy.",
    "Beautiful view, really enjoyed it!"
  ],

  generate: (userIds, listingIds, maxReviewsPerListing = 5) => {
    const reviews = [];

    listingIds.forEach((listingId) => {
      const numberOfReviews = faker.number.int({ min: 1, max: maxReviewsPerListing });

      for (let i = 0; i < numberOfReviews; i++) {
        const userId = userIds[faker.number.int({ min: 0, max: userIds.length - 1 })];
        const comment = FakeReviews.comments[faker.number.int({ min: 0, max: FakeReviews.comments.length - 1 })];
        const rating = faker.number.float({ min: 3, max: 5, precision: 0.1 });

        reviews.push({
          listing: listingId,
          user: userId,
          comment,
          rating
        });
      }
    });

    return reviews;
  }
};