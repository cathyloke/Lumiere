import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from '../modules/profileStyle';

export const ProfileButton = ( props : any) => {
    return(
        <TouchableOpacity
            style={styles.optionButton}
            onPress={props.onPress}
        >
            <Text style={styles.optionText}>{props.title}</Text>
        </TouchableOpacity>
    )
}