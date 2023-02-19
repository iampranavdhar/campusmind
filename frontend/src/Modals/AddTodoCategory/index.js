import React from "react";
import { Pressable } from "react-native";
import { View, Text, TextInput } from "react-native";
import { ModalCard } from "../ModalCard";
import { styles } from "./styles";

export default function AddTodoCategory({
  setShowAddCategoryModal,
  setSelectedColor,
  selectedColor,
  setCategoryName,
  categoryName,
  handleSubmit,
}) {
  return (
    <ModalCard>
      <View style={styles.addCategoryModalContainer}>
        <TextInput
          style={styles.addCategoryTextInput}
          placeholder="Add Category"
          value={categoryName}
          onChangeText={(text) => setCategoryName(text)}
        />
        <View style={styles.colorPreferences}>
          <Pressable
            onPress={() => setSelectedColor("#FFB3B3")}
            style={[
              selectedColor === "#FFB3B3" ? styles.selectedColorOption : null,
              styles.colorOption,
              { backgroundColor: "#FFB3B3" },
            ]}
          ></Pressable>
          <Pressable
            onPress={() => setSelectedColor("#FF809E")}
            style={[
              selectedColor === "#FF809E" ? styles.selectedColorOption : null,
              styles.colorOption,
              { backgroundColor: "#FF809E" },
            ]}
          ></Pressable>
          <Pressable
            onPress={() => setSelectedColor("#F27551")}
            style={[
              selectedColor === "#F27551" ? styles.selectedColorOption : null,
              styles.colorOption,
              { backgroundColor: "#F27551" },
            ]}
          ></Pressable>
          <Pressable
            onPress={() => setSelectedColor("#8CFF90")}
            style={[
              selectedColor === "#8CFF90" ? styles.selectedColorOption : null,
              styles.colorOption,
              { backgroundColor: "#8CFF90" },
            ]}
          ></Pressable>
          <Pressable
            onPress={() => setSelectedColor("#E376AE")}
            style={[
              selectedColor === "#E376AE" ? styles.selectedColorOption : null,
              styles.colorOption,
              { backgroundColor: "#E376AE" },
            ]}
          ></Pressable>
          <Pressable
            onPress={() => setSelectedColor("#8CE3FF")}
            style={[
              selectedColor === "#8CE3FF" ? styles.selectedColorOption : null,
              styles.colorOption,
              { backgroundColor: "#8CE3FF" },
            ]}
          ></Pressable>
        </View>
        <View style={styles.addCategoryModalButtons}>
          <Pressable
            onPress={() => setShowAddCategoryModal(false)}
            style={styles.closeButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          <Pressable style={styles.addButton} onPress={()=>handleSubmit()}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </ModalCard>
  );
}
