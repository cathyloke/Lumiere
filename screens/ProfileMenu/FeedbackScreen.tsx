import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import { styles } from '../../modules/profileStyle';
import io from 'socket.io-client';
import { getSession } from '../../assets/sessionData';

var socket = io('http://10.0.2.2:5001/chat', {
   transports: ['websocket'],
});

const FeedbackScreen = () => {
   const [selectedBoxes, setSelectedBoxes] = useState([false, false, false, false, false, false]);
   const [number, setNumber] = useState('');
   const [userName, setUserName] = useState<string | null>(null);

   useEffect(() => {
      const fetchUserName = async () => {
          const session = await getSession();
          setUserName(session?.userName || 'Anonymous');
      };
      fetchUserName();
  }, []);

   const toggleSelection = (index) => {
      const newSelection = [...selectedBoxes];
      newSelection[index] = !newSelection[index];
      setSelectedBoxes(newSelection);
   };

   const handleSubmit = () => {
      if (number.trim() === '') {
         Alert.alert('Comment field is empty');
      } else {
         // Emit feedback through WebSocket
         const feedbackData = {
            sender: userName,
            message: number,
         };
         socket.emit('feedback_sent', feedbackData);

         Alert.alert('Successfully submitted', 'Thank you for your feedback!');
         setNumber(''); // Clear the feedback input
      }
   };

   return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#F8F0E5'}}>
         <View>
            <Text style={styles.title}>Your Feedback Matters</Text>
            <Text style={styles.subtitle}>Let us know how we can serve you better.</Text>
         </View>

         {/* First Row of Boxes */}
         <View style={styles.row}>
            <TouchableOpacity onPress={() => toggleSelection(0)} style={[styles.box, selectedBoxes[0] && styles.selectedBox]}>
               <Text style={[styles.text, selectedBoxes[0] && styles.selectedText]}>
                  {selectedBoxes[0] ? 'Packaging' : 'Packaging'}
               </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleSelection(1)} style={[styles.box, selectedBoxes[1] && styles.selectedBox]}>
               <Text style={[styles.text, selectedBoxes[1] && styles.selectedText]}>
                  {selectedBoxes[1] ? 'Delivery' : 'Delivery'}
               </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleSelection(2)} style={[styles.box, selectedBoxes[2] && styles.selectedBox]}>
               <Text style={[styles.text, selectedBoxes[2] && styles.selectedText]}>
                  {selectedBoxes[2] ? 'App' : 'App'}
               </Text>
            </TouchableOpacity>
         </View>

         {/* Second Row of Boxes */}
         <View style={styles.row}>
            <TouchableOpacity onPress={() => toggleSelection(3)} style={[styles.box, selectedBoxes[3] && styles.selectedBox]}>
               <Text style={[styles.text, selectedBoxes[3] && styles.selectedText]}>
                  {selectedBoxes[3] ? 'Balance' : 'Balance'}
               </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleSelection(4)} style={[styles.box, selectedBoxes[4] && styles.selectedBox]}>
               <Text style={[styles.text, selectedBoxes[4] && styles.selectedText]}>
                  {selectedBoxes[4] ? 'Menu' : 'Menu'}
               </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleSelection(5)} style={[styles.box, selectedBoxes[5] && styles.selectedBox]}>
               <Text style={[styles.text, selectedBoxes[5] && styles.selectedText]}>
                  {selectedBoxes[5] ? 'Other' : 'Other'}
               </Text>
            </TouchableOpacity>
         </View>

         <View>
            <Text style={styles.comments}>Please write your comments:</Text>
            <SafeAreaView>
               <TextInput
                  style={styles.inputs}
                  onChangeText={setNumber}
                  value={number}
                  placeholder="Enter your comment here"
                  keyboardType="default"
                  textAlignVertical="top"
                  multiline
               />
            </SafeAreaView>
         </View>

         <View style={styles.subbutton}>
            <Button
               title="Submit"
               color="#102C57"
               onPress={handleSubmit}
            />
         </View>
      </View>
   );
};

export default FeedbackScreen;
