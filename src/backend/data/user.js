import { FakeUser } from "./faker.js";

export const usersData = [
  {
    name: FakeUser.name(),
    email: FakeUser.email(),
    password: FakeUser.password(),
    avatar: FakeUser.avatar(),
    isHost: true,
  },
  {
    name: FakeUser.name(),
    email: FakeUser.email(),
    password: FakeUser.password(),
    avatar: FakeUser.avatar(),
    isHost: false,
  },
  {
    name: FakeUser.name(),
    email: FakeUser.email(),
    password: FakeUser.password(),
    avatar: FakeUser.avatar(),
    isHost: true,
  },
];
