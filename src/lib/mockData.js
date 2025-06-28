// Mock data for Dragon Ball characters (fallback if API fails)
export const mockCharacters = [
    {
        id: 1,
        name: "Goku",
        ki: "60,000,000",
        maxKi: "90,000,000,000,000,000,000",
        race: "Saiyan",
        gender: "Male",
        description: "Goku is a Saiyan warrior originally sent to Earth as an infant to conquer the planet. However, an accident alters his memory, allowing him to grow up to become Earth's greatest defender.",
        image: "https://dragonball-api.com/characters/goku_normal.webp",
        affiliation: "Z Fighter"
    },
    {
        id: 2,
        name: "Vegeta",
        ki: "54,000,000",
        maxKi: "19,400,000,000,000,000,000",
        race: "Saiyan",
        gender: "Male",
        description: "Prince of the fallen Saiyan race and one of the main characters of the Dragon Ball series. Originally a villain, he becomes a crucial ally and one of the strongest fighters.",
        image: "https://dragonball-api.com/characters/vegeta_normal.webp",
        affiliation: "Z Fighter"
    },
    {
        id: 3,
        name: "Piccolo",
        ki: "2,000,000",
        maxKi: "500,000,000",
        race: "Namekian",
        gender: "Male",
        description: "Originally the reincarnation of the evil Piccolo Daimaō, he becomes one of Earth's greatest defenders and Gohan's mentor.",
        image: "https://dragonball-api.com/characters/piccolo_normal.webp",
        affiliation: "Z Fighter"
    },
    {
        id: 4,
        name: "Gohan",
        ki: "45,000,000",
        maxKi: "40,000,000,000,000,000,000",
        race: "Half-Saiyan",
        gender: "Male",
        description: "Goku's eldest son and one of the strongest fighters in the universe. Though preferring peace and studies, he has incredible hidden power.",
        image: "https://dragonball-api.com/characters/gohan_normal.webp",
        affiliation: "Z Fighter"
    },
    {
        id: 5,
        name: "Frieza",
        ki: "60,000,000",
        maxKi: "1,700,000,000,000,000,000",
        race: "Frieza Race",
        gender: "Male",
        description: "The emperor of the universe and one of the most powerful villains in Dragon Ball. Known for his cruelty and incredible transformations.",
        image: "https://dragonball-api.com/characters/frieza_normal.webp",
        affiliation: "Frieza Force"
    },
    {
        id: 6,
        name: "Cell",
        ki: "900,000,000",
        maxKi: "2,230,000,000,000,000,000",
        race: "Android",
        gender: "Male",
        description: "A bio-android created by Dr. Gero, composed of cells from many fighters including Goku, Vegeta, Piccolo, and Frieza.",
        image: "https://dragonball-api.com/characters/cell_normal.webp",
        affiliation: "Red Ribbon Army"
    }
];

export const mockPlanets = [
    {
        id: 1,
        name: "Earth",
        isDestroyed: false,
        description: "The home planet of humanity and the main setting for most of Dragon Ball's story."
    },
    {
        id: 2,
        name: "Namek",
        isDestroyed: true,
        description: "The home planet of the Namekians, known for creating the Dragon Balls."
    },
    {
        id: 3,
        name: "Vegeta",
        isDestroyed: true,
        description: "The former home planet of the Saiyan race, destroyed by Frieza."
    }
];
