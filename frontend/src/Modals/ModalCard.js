import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";

export function ModalCard({ children }) {
  return (
    <Modal transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
