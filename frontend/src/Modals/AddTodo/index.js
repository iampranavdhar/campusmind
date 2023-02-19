import React from "react";
import { Pressable } from "react-native";
import { View, Text, TextInput } from "react-native";
import { ModalCard } from "../ModalCard";
import { styles } from "./styles";

export default function AddTodo({
  showAddTodoModal,
  setShowAddTodoModal,
  selectedCategory,
  setTaskName,
  taskName,
  taskDescription,
  setTaskDescription,
  handleSubmit,
}) {
  return (
    <ModalCard visible={showAddTodoModal}>
      <View style={styles.addTodoModalContainer}>
        <Text style={styles.selectedCategoryTitle}>~/{selectedCategory}/</Text>
        <TextInput
          style={styles.addTodoTextInput}
          placeholder="Todo Title"
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
        />
        <View style={styles.todoDescriptionInput}>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.todoDescriptionTextInput}
            textAlignVertical="top"
            placeholder="Todo Description"
            value={taskDescription}
            onChangeText={(text) => setTaskDescription(text)}
          />
        </View>
        <View style={styles.addTodoModalButtons}>
          <Pressable
            onPress={() => setShowAddTodoModal(false)}
            style={styles.closeButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          <Pressable style={styles.addButton} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </ModalCard>
  );
}
