import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ModalCard } from "../ModalCard";
import { styles } from "./styles";

// For adding both batch and section
export default function AddTextOnly({
  showAddTextModal,
  setShowAddTextModal,
  setText,
  text,
  handleSubmit,
  modalName,
}) {
  return (
    <ModalCard visible={showAddTextModal}>
      <View style={styles.addTextModalContainer}>
        <Text style={styles.modalTitle}>Add {modalName}</Text>
        <TextInput
          style={styles.addTextInput}
          placeholder="Type here"
          value={text}
          onChangeText={(text) => setText(text)}
        />

        <View style={styles.addTextModalButtons}>
          <TouchableOpacity
            onPress={() => setShowAddTextModal(false)}
            style={styles.closeButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalCard>
  );
}
