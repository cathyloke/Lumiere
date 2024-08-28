import React, { useState } from 'react';
import { View, Text, TouchableOpacity , SafeAreaView, TextInput, Button} from 'react-native';
import { styles } from '../../modules/profileStyle';

const FeedbackScreen = () => {
   // Create a state array to track the selection status of each box
   const [selectedBoxes, setSelectedBoxes] = useState([false, false, false, false, false, false]);

   // Function to toggle the selection of a specific box
   const toggleSelection = (index) => {
      // Update the state by toggling the specific box's selection status
      const newSelection = [...selectedBoxes];
      newSelection[index] = !newSelection[index];
      setSelectedBoxes(newSelection);
   };

   const [number, onChangeNumber] = React.useState('');


   return (
      <View>
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
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Enter your comment here"
                  keyboardType="default"
                  textAlignVertical="top"
               />
            </SafeAreaView>
         </View>

         <View style={styles.subbutton}>
            <Button
               title="Submit"
               color="#102C57"
            />
         </View>
      </View>
   );
};

export default FeedbackScreen;
