import React from 'react'
import { View, Text } from 'react-native'
import ProgressCircle from "react-native-progress-circle";
import {styles} from './styles'

export default function GPACard({gpaTitle, gpa}) {
    return (
        <View style={styles.gpaInfo}>
          <Text style={styles.gpaTitle}>{gpaTitle}</Text>
          <ProgressCircle
            percent={(gpa/ 10) * 100}
            radius={30}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 10 }}>{gpa} / 10</Text>
          </ProgressCircle>
        </View>
    )
}