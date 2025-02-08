import {PrismaClient, OrderStatus} from "@prisma/client";

const prisma = new PrismaClient();

function generateRandomEmail() {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
  const randomString = Math.random().toString(36).substring(7);
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `user_${randomString}@${randomDomain}`;
}

function generateRandomName() {
  const firstNames = [
    "Ahmed",
    "Mohammed",
    "Ali",
    "Omar",
    "Khaled",
    "Hassan",
    "Hussein",
    "Yousef",
    "Abdullah",
  ];
  const lastNames = [
    "Zatar",
    "Al-Farsi",
    "Ibrahim",
    "Saleh",
    "Al-Majali",
    "Nasser",
    "Al-Khatib",
    "Haddad",
    "Shahin",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

function generateRandomPhoneNumber() {
  const prefixes = ["+96279", "+96278", "+96277"];
  const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
  return `${
    prefixes[Math.floor(Math.random() * prefixes.length)]
  }${randomDigits}`;
}

function generateRandomStatus() {
  const statuses = Object.values(OrderStatus);
  return statuses[Math.floor(Math.random() * statuses.length)];
}

async function main() {
  console.log("Seeding database...");

  const product1 = await prisma.product.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: "Book A",
      description: "Book A description",
      price: 250.0,
    },
  });

  const product2 = await prisma.product.upsert({
    where: {id: 2},
    update: {},
    create: {
      name: "Book B",
      description: "Book B description",
      price: 1200.0,
    },
  });

  const order = await prisma.order.create({
    data: {
      customerName: generateRandomName(),
      email: generateRandomEmail(),
      mobileNumber: generateRandomPhoneNumber(),
      status: "CONFIRMED",
      products: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
          },
          {
            productId: product2.id,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
