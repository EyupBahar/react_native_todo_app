import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  TextInput,
} from 'react-native';

const Task = ({
  taskItems,
  setTaskItems,
  selectedTask,
  setTasks,
  setSelectedTask,
}) => {
  console.log('selectedTask', selectedTask);
  const [isCompleted, setIsCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  console.log('isCompleted', isCompleted);

  const deleteTask = index => {
    console.log('index sadsa', index);
    let newItems = [...taskItems];
    newItems.splice(index + 1, 1);
    setTaskItems(newItems);
    console.log('newItems', newItems);
  };

  return (
    <SafeAreaView>
      {taskItems.map((item, index) => (
        <View
          style={styles.item}
          backgroundColor={isCompleted ? '#21A362' : 'white'}>
          <View style={styles.itemLeft}>
            <Pressable onPress={() => setIsCompleted(!isCompleted)}>
              <View>
                {!isCompleted ? (
                  <Image
                    source={require('../assets/unCompleted.png')}
                    style={styles.complete}
                  />
                ) : (
                  <Image
                    source={require('../assets/completed.png')}
                    style={styles.complete}
                  />
                )}
              </View>
            </Pressable>
            <Text style={styles.itemText}>{item}</Text>
          </View>

          <Pressable
            /* style={[styles.button, styles.buttonOpen]} */
            onPress={() => {
              setModalVisible(true);
              setSelectedTask(item);
            }}>
            <Image
              source={require('../assets/update.png')}
              style={styles.image}
            />
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <View style={styles.modalBox}>
                <TextInput
                  style={styles.modalText}
                  value={selectedTask}
                  onChangeText={value => setSelectedTask(value)}
                  setTask={null}
                />
                <View style={styles.buttons}>
                  <Pressable
                    onPress={() => {
                      deleteTask(index);
                      setModalVisible(false);
                    }}>
                    <Image
                      source={require('../assets/delete.png')}
                      style={styles.image}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTaskItems(
                        taskItems.map((_item, _index) => {
                          if (index === _index + 1) {
                            return selectedTask;
                          } else {
                            return _item;
                          }
                        }),
                      );
                      setModalVisible(false);
                    }}>
                    <Image
                      source={require('../assets/update.png')}
                      style={styles.image}
                    />
                  </Pressable>
                </View>
                <Pressable
                  /* style={[styles.button, styles.buttonClose]} */
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
  },
  modalText: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  item: {
    position: 'relative',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: -150,
    right: -120,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  complete: {
    width: 24,
    height: 24,
  },
  itemText: {
    maxWidth: '80%',
    marginLeft: 10,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  modalView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
    position: 'relative',
  },
  modalBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '80%',
    height: '25%',
    backgroundColor: '#fff',
  },
});

export default Task;
