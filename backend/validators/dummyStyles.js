const dummyHijabStyles = [
  {
    name: "Turkish Style Hijab",
    description: "A modern hijab style with a voluminous front and wrapped neatly around the neck.",
    difficultyLevel: "Easy",
    materialRecommendations: ["Chiffon", "Silk"],
    suitableForOccasions: ["Casual", "Work"],
    imageUrl: "https://example.com/turkish-style.jpg",
    reviews: [
      {
        description: "Love this style! So comfortable for everyday wear.",
        rating: 5,
        user: new mongoose.Types.ObjectId()
      },
      {
        description: "Takes some practice to get it right, but looks great once mastered.",
        rating: 4,
        user: new mongoose.Types.ObjectId()
      }
    ]
  },
  {
    name: "Emirati Style Hijab",
    description: "A traditional style with the hijab draped over the shoulders, popular in the Gulf region.",
    difficultyLevel: "Medium",
    materialRecommendations: ["Georgette", "Crepe"],
    suitableForOccasions: ["Formal", "Weddings"],
    imageUrl: "https://example.com/emirati-style.jpg",
    reviews: [
      {
        description: "Perfect for special occasions. Gets lots of compliments!",
        rating: 5,
        user: new mongoose.Types.ObjectId()
      }
    ]
  },
  {
    name: "Indonesian Style Hijab",
    description: "A modest style with the hijab pinned under the chin, creating a neat frame for the face.",
    difficultyLevel: "Easy",
    materialRecommendations: ["Cotton", "Viscose"],
    suitableForOccasions: ["Casual", "School"],
    imageUrl: "https://example.com/indonesian-style.jpg",
    reviews: [
      {
        description: "My go-to style for daily wear. So practical!",
        rating: 5,
        user: new mongoose.Types.ObjectId()
      },
      {
        description: "Simple yet elegant. Great for beginners.",
        rating: 5,
        user: new mongoose.Types.ObjectId()
      }
    ]
  },
  {
    name: "Moroccan Style Hijab",
    description: "A stylish wrap with the hijab draped over one shoulder, creating a sophisticated look.",
    difficultyLevel: "Hard",
    materialRecommendations: ["Linen", "Silk"],
    suitableForOccasions: ["Formal", "Parties"],
    imageUrl: "https://example.com/moroccan-style.jpg",
    reviews: [
      {
        description: "Took me several tries to get it right, but worth it!",
        rating: 4,
        user: new mongoose.Types.ObjectId()
      },
      {
        description: "Beautiful but not very practical for everyday use.",
        rating: 3,
        user: new mongoose.Types.ObjectId()
      }
    ]
  },
  {
    name: "Modern Turban Style",
    description: "A contemporary take on the hijab, wrapped like a turban for a chic look.",
    difficultyLevel: "Medium",
    materialRecommendations: ["Jersey", "Knit"],
    suitableForOccasions: ["Casual", "Fashion"],
    imageUrl: "https://example.com/turban-style.jpg",
    reviews: [
      {
        description: "Very trendy and comfortable. My favorite!",
        rating: 5,
        user: new mongoose.Types.ObjectId()
      },
      {
        description: "Not suitable for formal occasions but great for casual outings.",
        rating: 4,
        user: new mongoose.Types.ObjectId()
      }
    ]
  }
];

// Insert the dummy data
async function insertDummyData() {
  try {
    await HijabStyle.deleteMany({}); // Clear existing data
    const insertedStyles = await HijabStyle.insertMany(dummyHijabStyles);
    console.log(`${insertedStyles.length} hijab styles inserted successfully!`);
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Connect to MongoDB and run the insertion
mongoose.connect('mongodb://localhost:27017/hijabStylesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  insertDummyData();
})
.catch(err => console.error('Connection error:', err));