import { Gender, PrismaClient } from ".prisma/client";
import "dotenv/config";
import faker from "faker/locale/nb_NO";

(async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const drink1 = await prisma.drink.create({
    data: { name: "Liten øl", volume: 0.33, percentage: 4.7 },
  });

  const drink2 = await prisma.drink.create({
    data: { name: "Vanlig øl", volume: 0.5, percentage: 4.7 },
  });

  const user1 = await prisma.user.create({
    data: {
      name: faker.name.firstName(),
      birthDate: faker.date.past(),
      gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
      height: faker.random.number({ min: 140, max: 210 }),
      weight: faker.random.number({ min: 50, max: 120 }),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: faker.name.firstName(),
      birthDate: faker.date.past(),
      gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
      height: faker.random.number({ min: 140, max: 210 }),
      weight: faker.random.number({ min: 50, max: 120 }),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: faker.name.firstName(),
      birthDate: faker.date.past(),
      gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
      height: faker.random.number({ min: 140, max: 210 }),
      weight: faker.random.number({ min: 50, max: 120 }),
    },
  });

  const session1 = await prisma.session.create({
    data: {
      name: faker.hacker.phrase(),
      ownerId: user1.id,
      code: faker.random.word(),
    },
  });

  const participant1 = await prisma.participant.create({
    data: { sessionId: session1.id, userId: user1.id },
  });

  const participant2 = await prisma.participant.create({
    data: { sessionId: session1.id, userId: user2.id },
  });

  const participant3 = await prisma.participant.create({
    data: { sessionId: session1.id, userId: user3.id },
  });

  await prisma.consumption.create({
    data: {
      participantUserId: participant1.userId,
      participantSessionId: participant1.sessionId,
      drinkId: drink1.id,
    },
  });

  await prisma.consumption.create({
    data: {
      participantUserId: participant2.userId,
      participantSessionId: participant2.sessionId,
      drinkId: drink1.id,
    },
  });

  await prisma.consumption.create({
    data: {
      participantUserId: participant1.userId,
      participantSessionId: participant1.sessionId,
      drinkId: drink2.id,
    },
  });

  await prisma.consumption.create({
    data: {
      participantUserId: participant3.userId,
      participantSessionId: participant3.sessionId,
      drinkId: drink2.id,
    },
  });

  await prisma.consumption.create({
    data: {
      participantUserId: participant3.userId,
      participantSessionId: participant3.sessionId,
      drinkId: drink2.id,
    },
  });
})();
