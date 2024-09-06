import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  return (
    <View style={{flex:1, backgroundColor:'#f3f4f6'}}>
      <StatusBar barStyle="light-content"/>
      <View style={styles.headerContainer}>  
        <Text style={styles.headerText}>WE ARE EIGENVALUE TEAM</Text> 
      </View>
      <GreenComponent/>
    </View>
  );
}

const GreenComponent = () => {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handlePress = async () => {
    if (inputText.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập văn bản.');
      return;
    }

    try {
      const response = await fetch('http://46.250.234.244:5007/gen_data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: inputText,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseData(result);
        // Alert.alert('Thành công', 'Dữ liệu đã được lấy thành công!');
        setInputText(''); // Xóa nội dung ô nhập liệu
      } else {
        Alert.alert('Lỗi', result.message || 'Có sự cố xảy ra.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Lỗi mạng. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text style={styles.mainText}>La Bàn Ẩm Thực</Text>
      <Text style={styles.sloganText}>Cùng bạn chọn món, nâng tầm trải nghiệm</Text> 
      <Text style={styles.subText}>Bạn đang nghĩ gì?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder='Nhập tâm trạng, sở thích,..'  
          value={inputText}
          onChangeText={setInputText}
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handlePress}>
        <Text style={{color:'white',fontSize:20}}>Gợi ý</Text>
      </TouchableOpacity>

      {responseData && (
        <ScrollView style={styles.responseContainer}>
          <View style={styles.responseCard}>
            <Text style={styles.responseTitle}>Tên món ăn:</Text>
            <Text style={styles.responseText}>{responseData.dish_name}</Text>
            
            <Text style={styles.responseTitle}>Mô tả:</Text>
            <Text style={styles.responseText}>{responseData.description}</Text>
            
            <Text style={styles.responseTitle}>Lý do:</Text>
            <Text style={styles.responseText}>{responseData.reason}</Text>
            
            <Text style={styles.responseTitle}>Đánh giá:</Text>
            <Text style={styles.responseText}>{responseData.review}</Text>
            
            <Text style={styles.responseTitle}>Nguyên liệu:</Text>
            <Text style={styles.responseText}>{responseData.ingredients.join(', ')}</Text>
            
            <Text style={styles.responseTitle}>Ẩm thực:</Text>
            <Text style={styles.responseText}>{responseData.cuisine}</Text>
            
            <Text style={styles.responseTitle}>Phù hợp với:</Text>
            <Text style={styles.responseText}>{responseData.suitable_for}</Text>
            
            <Text style={styles.responseTitle}>Calo:</Text>
            <Text style={styles.responseText}>{responseData.calories}</Text>
            
            <Text style={styles.responseTitle}>Chất dinh dưỡng:</Text>
            <Text style={styles.responseText}>{responseData.nutrient}</Text>
            
            {responseData.restaurants.map((restaurant, index) => (
              <View key={index} style={styles.restaurantContainer}>
                <Text style={styles.responseTitle}>Nhà hàng {index + 1}</Text>
                <Text style={styles.responseTitle}>Tên nhà hàng:</Text>
                <Text style={styles.responseText}>{restaurant.name}</Text>
                <Text style={styles.responseTitle}>Địa chỉ:</Text>
                <Text style={styles.responseText}>{restaurant.address}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: "20%",
    backgroundColor: '#4C6EF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sloganText: {
    color: '#555',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 5,
    marginLeft: 55,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 15,
    width: windowWidth - 100,
  },
  mainText: {
    color: '#333',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 85,
    marginTop: 20,
    letterSpacing: 1,
  },
  subText: {
    color: '#555',
    fontSize: 18,
    marginLeft: 15,
    marginTop: 30,
    fontStyle: 'italic',
  },
  searchButton: {
    width: windowWidth - 300,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C5CE7',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  responseContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  responseCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  responseTitle: {
    color: '#2c3e50',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  responseText: {
    color: '#7f8c8d',
    fontSize: 16,
    marginBottom: 15,
  },
  restaurantContainer: {
    marginBottom: 15,
  },
});
