const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.datas.createMany({
    data: [
      { term: "Mobile Legends", interpretation: "A popular mobile MOBA game." },
      {
        term: "Gank",
        interpretation:
          "A strategy involving multiple players attacking one target.",
      },
      {
        term: "Buff",
        interpretation: "A temporary enhancement of a hero or skill.",
      },
      {
        term: "Nerf",
        interpretation: "A reduction in the effectiveness of a hero or skill.",
      },
      {
        term: "Lane",
        interpretation:
          "Paths on the map where players farm minions and push towers.",
      },
      {
        term: "ADC",
        interpretation:
          "Attack Damage Carry; a hero role focused on dealing high physical damage.",
      },
      {
        term: "Tank",
        interpretation:
          "A hero role with high durability, protecting the team.",
      },
      {
        term: "CC",
        interpretation:
          "Crowd Control; abilities that disable or slow enemy heroes.",
      },
      {
        term: "Jungle",
        interpretation: "The area between lanes where neutral monsters spawn.",
      },
      {
        term: "Roaming",
        interpretation:
          "The act of moving between lanes to support other teammates.",
      },
      {
        term: "Farm",
        interpretation:
          "Gaining gold and experience by killing minions or monsters.",
      },
      {
        term: "Ult",
        interpretation: "Ultimate ability; the most powerful skill of a hero.",
      },
      {
        term: "MM",
        interpretation:
          "Marksman; a hero role with ranged attacks and high damage potential.",
      },
      {
        term: "Assassin",
        interpretation:
          "A hero role that focuses on eliminating enemies quickly with burst damage.",
      },
      {
        term: "Support",
        interpretation:
          "A hero role that provides healing or buffs to teammates.",
      },
      {
        term: "Squishy",
        interpretation:
          "A term used to describe heroes with low health and defenses.",
      },
      {
        term: "KDA",
        interpretation:
          "Kills, Deaths, and Assists; a measure of a player’s performance.",
      },
      {
        term: "Dive",
        interpretation:
          "An aggressive tactic where players enter enemy territory to secure kills.",
      },
      {
        term: "Push",
        interpretation:
          "The act of advancing towards enemy towers to destroy them.",
      },
      {
        term: "Recall",
        interpretation: "Returning to base to heal and regenerate resources.",
      },
    ],
  });
  console.log("Data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
