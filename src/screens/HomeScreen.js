import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Merhaba! Size nasıl yardımcı olabilirim? Restoran önerileri veya yemek tarifleri hakkında bilgi almak ister misiniz?', isBot: true }
  ]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: chatMessages.length + 1,
        text: message,
        isBot: false
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');

      // Bot yanıtı
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          text: 'Size yardımcı olmaktan mutluluk duyarım! Başka bir sorunuz var mı?',
          isBot: true
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.heroImage}
          />
          <Text style={styles.heroTitle}>En İyi Yerel Lezzetleri Keşfedin</Text>
          <Text style={styles.heroSubtitle}>Şehrinizin en iyi restoranlarını ve yerel lezzetlerini keşfedin</Text>
        </View>

        {/* Öne Çıkan Kategoriler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Öne Çıkan Kategoriler</Text>
          <View style={styles.categoryGrid}>
            <TouchableOpacity style={styles.categoryCard}>
              <MaterialIcons name="restaurant" size={40} color="#FF6B6B" />
              <Text style={styles.categoryText}>Restoranlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <MaterialIcons name="local-cafe" size={40} color="#FF6B6B" />
              <Text style={styles.categoryText}>Kafeler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <MaterialIcons name="local-pizza" size={40} color="#FF6B6B" />
              <Text style={styles.categoryText}>Fast Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <MaterialIcons name="local-bar" size={40} color="#FF6B6B" />
              <Text style={styles.categoryText}>Barlar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popüler Restoranlar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popüler Restoranlar</Text>
          <View style={styles.restaurantList}>
            <TouchableOpacity style={styles.restaurantCard}>
              <Image
                source={{ uri: 'https://via.placeholder.com/300x150' }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>Lezzet Durağı</Text>
                <Text style={styles.restaurantDesc}>Geleneksel Türk mutfağının en iyi örnekleri</Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>4.8</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Chatbot Button */}
      <TouchableOpacity style={styles.chatButton} onPress={toggleChat}>
        <MaterialIcons name="chat" size={24} color="white" />
        <Text style={styles.chatButtonText}>Yemek Asistanı</Text>
      </TouchableOpacity>

      {/* Chat Window */}
      {isChatOpen && (
        <View style={styles.chatWindow}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>Yemek Asistanı</Text>
            <TouchableOpacity onPress={toggleChat}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.chatMessages}>
            {chatMessages.map(msg => (
              <View key={msg.id} style={[styles.message, msg.isBot ? styles.botMessage : styles.userMessage]}>
                <Text style={msg.isBot ? styles.botMessageText : styles.userMessageText}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.chatInput}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Mesajınızı yazın..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  restaurantList: {
    marginTop: 10,
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantDesc: {
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    color: '#FFD700',
    fontWeight: '500',
  },
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '500',
  },
  chatWindow: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatHeader: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  chatHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    padding: 15,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#FF6B6B',
    alignSelf: 'flex-end',
  },
  botMessageText: {
    color: '#333',
  },
  userMessageText: {
    color: 'white',
  },
  chatInput: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
