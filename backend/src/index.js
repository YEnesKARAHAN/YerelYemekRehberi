const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Örnek restoran verileri
const restaurants = [
  {
    id: 1,
    name: "Kebapçı Mehmet Usta",
    cuisine: "Türk Mutfağı",
    address: "Atatürk Caddesi No:123, İstanbul",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    description: "Geleneksel Türk mutfağının en lezzetli örnekleri"
  },
  {
    id: 2,
    name: "Pizza Roma",
    cuisine: "İtalyan Mutfağı",
    address: "Bağdat Caddesi No:456, İstanbul",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.2,
    description: "Otantik İtalyan pizzaları ve makarnaları"
  },
  {
    id: 3,
    name: "Sushi Master",
    cuisine: "Japon Mutfağı",
    address: "Nişantaşı No:789, İstanbul",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    description: "En taze malzemelerle hazırlanan sushi ve sashimi"
  },
  {
    id: 4,
    name: "Köfteci Yusuf",
    cuisine: "Türk Mutfağı",
    address: "Kadıköy Meydanı No:101, İstanbul",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.3,
    description: "Geleneksel usulde hazırlanan köfteler"
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Yerel Yemek Rehberi API' });
});

// Restaurant routes
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ message: 'Restoran bulunamadı' });
  }
  res.json(restaurant);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 