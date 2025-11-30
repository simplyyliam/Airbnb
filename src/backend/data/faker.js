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


export const FakeListing = {
  title: () => faker.commerce.productName(),
  city: () => faker.location.city(),
  country: () => faker.location.country(),
  price: () => faker.number.int({ min: 50, max: 500 }),
  guests: () => faker.number.int({ min: 1, max: 8 }),
  bedrooms: () => faker.number.int({ min: 1, max: 5 }),
  bathrooms: () => faker.number.int({ min: 1, max: 3 }),
  images: (num = 3) =>
    Array.from({ length: num }).map(
      () => `https://source.unsplash.com/800x600/?interior,apartment,room&sig=${faker.string.uuid()}`
    ),
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