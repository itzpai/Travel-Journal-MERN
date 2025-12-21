import dotenv from "dotenv";
import TravelEntry from "../models/TravelEntry";
import connectDB from "../config/database";

dotenv.config();

const seedData = [
  {
    name: "Bagan",
    location:
      "https://www.google.com/maps/place/Bagan/@21.1670641,94.9314111,13z/data=!4m6!3m5!1s0x30acd5e91d398285:0x4743048365411392!8m2!3d21.1670641!4d94.9314111!16s%2Fg%2F11f4g4_m20?entry=ttu&g_ep=EgoyMDI1MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    country: "Myanmar",
    about:
      "Bagan (Burmese: ပုဂံ, formerly Pagan) is an ancient city and a UNESCO World Heritage Site in the Mandalay Region of Myanmar.[1] From the 9th to 13th centuries, the city was the capital of the Pagan Kingdom, the first kingdom that unified the regions that would later constitute Myanmar. During the kingdom's height between the 11th and 13th centuries, more than 10,000 Buddhist temples, pagodas and monasteries were constructed in the Bagan plains alone,[2] of which the remains of over 2200 temples and pagodas survive.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bagan%2C_Burma.jpg/500px-Bagan%2C_Burma.jpg",
  },
  {
    name: "Hpa-an",
    location:
      "https://www.google.com/maps/place/Hpa-an/@16.9000372,97.6330391,13z/data=!4m6!3m5!1s0x30c19261657e0745:0x340776b8b7686728!8m2!3d16.9000372!4d97.6330391!16s%2Fg%2F11h502r56v?entry=ttu&g_ep=EgoyMDI1MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    country: "Myanmar",
    about:
      "Hpa-an (Burmese: ဘားအံမြို့, also spelled Pa-an) is a large city in southeastern Myanmar and the capital and largest city of Kayin State (Karen State). The population as of the 2014 census was 421,575, mostly of the Karen ethnic group. Hpa-An has surpassed Taunggyi as the fifth largest city in Myanmar.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Hpa_An_03.jpg/500px-Hpa_An_03.jpg",
  },
  {
    name: "Inle Lake",
    location:
      "https://www.google.com/maps/place/Inle+Lake/@20.5334654,96.8233522,12z/data=!3m1!4b1!4m6!3m5!1s0x30ceed8ffad6a757:0xe8e599cbb7416c65!8m2!3d20.5862914!4d96.9101806!16zL20vMDUwaHE3?entry=ttu&g_ep=EgoyMDI1MDkyOC4wIKXMDSoASAFQAw%3D%3D",
    country: "Myanmar",
    about:
      "Inle Lake (Burmese: အင်းလေးကန်) is a freshwater lake located in the Nyaungshwe Township of Shan State, part of Shan Hills in Myanmar (Burma). It is the second largest lake in Myanmar, with an estimated surface area of 44.9 square miles (116 km2), and one of the highest at an elevation of 2,900 feet (880 m).",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Inle_Lake_%28Myanmar%29.jpg/500px-Inle_Lake_%28Myanmar%29.jpg",
  },
  {
    name: "Ngwe Saung",
    location:
      "https://www.google.com/maps/place/Ngwesaung/@16.8470086,94.3469369,13z/data=!3m1!4b1!4m6!3m5!1s0x30be35516a81d903:0x71c4ba09c8725022!8m2!3d16.8685083!4d94.3847814!16s%2Fm%2F07khvm0?authuser=0&entry=ttu&g_ep=EgoyMDI1MDkyOC4wIKXMDSoASAFQAw%3D%3D",
    country: "Myanmar",
    about:
      "Ngwesaung (Burmese: ငွေဆောင်), also spelt Ngwe Hsaung, is a beach resort located 48 km west of Pathein, Ayeyarwady Region, Myanmar. It is the namesake of Ngwesaung Subtownship, Pathein Township. In 2014, the town of Ngwesaung had 10,732 people.[3] The beach is 5 hours drive, with no traffic, away from the principal city of Yangon, and an airport is in the works. Buses leave at 6am & 9:30pm from in front of the Yangon Central Railway Station.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Lover_island.jpg/330px-Lover_island.jpg",
  },
  {
    name: "Mergui Archipelago",
    location:
      "https://www.google.com/maps/place/Myeik/@12.4520535,98.5801285,13z/data=!3m1!4b1!4m14!1m7!3m6!1s0x30f9b473c7b6ed35:0x299ad23b8b1bfda1!2sMergui+Archipelago!8m2!3d11.2524697!4d98.1786208!16zL20vMDVtbmtn!3m5!1s0x30fbb04dd43ed2db:0x4d1bccdd01a793d3!8m2!3d12.4492291!4d98.6270628!16zL20vMDZuODQ0?entry=ttu&g_ep=EgoyMDI1MDkyOC4wIKXMDSoASAFQAw%3D%3D",
    country: "Myanmar",
    about:
      "The Mergui Archipelago (also Myeik Archipelago or Myeik Kyunzu; Burmese: မြိတ်ကျွန်းစု) is located in far southern Myanmar (Burma) and is part of the Tanintharyi Region. It consists of around 800 islands,[1] varying in size from very small to hundreds of square kilometres, all lying in the Andaman Sea off the western shore of the Malay Peninsula near its landward (northern) end where it joins the rest of Indochina. They are occasionally referred to as the Pashu Islands because the Malay inhabitants are locally called Pashu.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/%E1%80%99%E1%80%BC%E1%80%AD%E1%80%90%E1%80%BA%E1%80%99%E1%80%BC%E1%80%AD%E1%80%AF%E1%80%B7.jpg/500px-%E1%80%99%E1%80%BC%E1%80%AD%E1%80%90%E1%80%BA%E1%80%99%E1%80%BC%E1%80%AD%E1%80%AF%E1%80%B7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await TravelEntry.deleteMany({});
    console.log("Cleared existing entries");

    const entries = await TravelEntry.insertMany(seedData);
    console.log(`Successfully seeded ${entries.length} travel entries`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
