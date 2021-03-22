import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const newItem = () => ({
  title: new Date().toString().substr(0, 10+Math.floor(Math.random()* 100)),
  id: Date.now(),
});

const maintainVisibleContentPosition = {
  minIndexForVisible: 0,
  autoscrollToTopThreshold: -1,
};

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  const [items, setItems] = React.useState(DATA);
  
    setTimeout(() => {
      const rand = Math.random();
      if (rand < 1/2) {
        setItems([...items, newItem()]);
        return;
      }
      if (rand < 2/2) {
        setItems([newItem(), ...items]);
        return;
      }

      if (items.length === 0) {
        return;
      }
      items[Math.floor(Math.random() * items.length)] = newItem();
    }, 1000);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted={true}
        maintainVisibleContentPosition={maintainVisibleContentPosition}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default App;